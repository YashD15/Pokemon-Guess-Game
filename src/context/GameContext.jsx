import { createContext, useEffect, useState } from "react";

export const GameContext = createContext();

const STORAGE_KEY = 'pokemon-game-session';

export const GameProvider = ({ children }) => {
    const [showRules, setShowRules] = useState(true);
    const [gameStarted, setGameStarted] = useState(false)
    const [score, setScore] = useState(0)
    const [currentRound, setCurrentRound] = useState(1)
    const [totalRounds] = useState(5)
    const [roundScores, setRoundScores] = useState([])
    const [gameCompleted, setGameCompleted] = useState(false)
    const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)

    const [pokemonData, setPokemonData] = useState({
        name: '',
        region: '',
        types: [],
        moves: [],
        image: ''
    })

    // Load session data from localStorage on component mount
    useEffect(() => {
        const savedSession = localStorage.getItem(STORAGE_KEY);
        if (savedSession) {
            try {
                const sessionData = JSON.parse(savedSession);
                if (sessionData.gameStarted && !sessionData.gameCompleted) {
                    // Restore game state
                    setGameStarted(sessionData.gameStarted);
                    setScore(sessionData.score);
                    setCurrentRound(sessionData.currentRound);
                    setRoundScores(sessionData.roundScores);
                    setGameCompleted(sessionData.gameCompleted);
                    setPokemonData(sessionData.pokemonData);
                    setShowRules(false);
                }
            } catch (error) {
                console.error('Error loading session data:', error);
                clearSession();
            }
        }
    }, []);

    // Save session data to localStorage whenever game state changes
    const saveSession = (gameState) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
        } catch (error) {
            console.error('Error saving session data:', error);
        }
    };

    // Clear session data
    const clearSession = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    // Reset game completely
    const resetGame = () => {
        clearSession();
        setShowRules(true);
        setGameStarted(false);
        setScore(0);
        setCurrentRound(1);
        setRoundScores([]);
        setGameCompleted(false);
        setIsLoadingPokemon(false);
        setPokemonData({
            name: '',
            region: '',
            types: [],
            moves: [],
            image: ''
        });
    };

    const startGame = async () => {
        // Clear any existing session
        clearSession();
        
        // Reset game state for a new game
        setCurrentRound(1)
        setRoundScores([])
        setScore(0)
        setGameCompleted(false)
        setGameStarted(true)
        
        await loadNewPokemon()
    }

    const loadNewPokemon = async () => {
        setIsLoadingPokemon(true);
        
        // Clear previous pokemon data first
        setPokemonData({
            name: '',
            region: '',
            types: [],
            moves: [],
            image: ''
        });

        var id = Math.floor(Math.random() * 809) + 1;
        var pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

        try {
            const pokemonResponse = await fetch(pokemonUrl)
            const data = await pokemonResponse.json()

            var species = await fetch(data.species.url)

            const regionData = await species.json()

            // Add a small delay to show the loading animation
            await new Promise(resolve => setTimeout(resolve, 800));

            const newPokemonData = {
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map((type) => type.type.name),
                moves: data.moves.map((move) => move.move.name),
                region: regionData.generation.name
            };

            setPokemonData(newPokemonData);

            // Save session after loading new pokemon
            const gameState = {
                gameStarted: true,
                score: score,
                currentRound: currentRound,
                roundScores: roundScores,
                gameCompleted: false,
                pokemonData: newPokemonData
            };
            saveSession(gameState);
        }
        catch (error) {
            console.error(error, error.message)
        } finally {
            setIsLoadingPokemon(false);
        }
    }

    const validateGame = async (userData) => {
        let roundScore = 0;
        
        // Validate Pokemon name (worth 2 points)
        if (userData.pokemonName.toLowerCase() === pokemonData.name.toLowerCase()) {
            roundScore += 2;
        }
        
        // Validate region (worth 1 point)
        if (userData.region === pokemonData.region) {
            roundScore += 1;
        }
        
        // Validate type1 (worth 1 point)
        if (pokemonData.types.includes(userData.type1)) {
            roundScore += 1;
        }
        
        // Validate type2 (worth 1 point)
        // Check if user selected "none" and Pokemon has only 1 type, or if the type matches
        if (userData.type2.toLowerCase() === 'none' && pokemonData.types.length === 1) {
            roundScore += 1;
        } else if (userData.type2.toLowerCase() !== 'none' && pokemonData.types.includes(userData.type2) && userData.type2.toLowerCase() != userData.type1.toLowerCase()) {
            roundScore += 1;
        }
        
        // Validate move1 (worth 1 point)
        if (pokemonData.moves.includes(userData.move1.toLowerCase().replace(/\s+/g, '-'))) {
            roundScore += 1;
        }
        
        // Validate move2 (worth 1 point)
        if (userData.move1.toLowerCase() != userData.move2.toLowerCase() && pokemonData.moves.includes(userData.move2.toLowerCase().replace(/\s+/g, '-'))) {
            roundScore += 1;
        }
        
        // Store round score
        const newRoundScores = [...roundScores, roundScore];
        setRoundScores(newRoundScores);
        
        // Update total score
        const totalScore = newRoundScores.reduce((sum, score) => sum + score, 0);
        setScore(totalScore);
        
        // Check if this was the last round
        if (currentRound >= totalRounds) {
            setGameCompleted(true);
            setGameStarted(false);
            setShowRules(true);
            clearSession(); // Clear session when game is completed
            alert(`Game Completed!\nFinal Score: ${totalScore}/${totalRounds * 7} (${Math.round((totalScore / (totalRounds * 7)) * 100)}%)`);
        } else {
            // Move to next round
            const nextRound = currentRound + 1;
            setCurrentRound(nextRound);
            
            // Save session before loading new pokemon
            const gameState = {
                gameStarted: true,
                score: totalScore,
                currentRound: nextRound,
                roundScores: newRoundScores,
                gameCompleted: false,
                pokemonData: pokemonData
            };
            saveSession(gameState);
            
            await loadNewPokemon();
        }
    }

    const skipRound = async () => {
        // Store 0 score for skipped round
        const newRoundScores = [...roundScores, 0];
        setRoundScores(newRoundScores);
        
        const totalScore = newRoundScores.reduce((sum, score) => sum + score, 0);
        setScore(totalScore);
        
        // Check if this was the last round
        if (currentRound >= totalRounds) {
            setGameCompleted(true);
            setGameStarted(false);
            setShowRules(true);
            clearSession(); // Clear session when game is completed
            alert(`Game Completed!\nFinal Score: ${totalScore}/${totalRounds * 7} (${Math.round((totalScore / (totalRounds * 7)) * 100)}%)`);
        } else {
            // Move to next round
            const nextRound = currentRound + 1;
            setCurrentRound(nextRound);
            
            // Save session before loading new pokemon
            const gameState = {
                gameStarted: true,
                score: totalScore,
                currentRound: nextRound,
                roundScores: newRoundScores,
                gameCompleted: false,
                pokemonData: pokemonData
            };
            saveSession(gameState);
            
            await loadNewPokemon();
        }
    }

    return (
        <GameContext.Provider value={{ 
            gameStarted, 
            showRules, 
            pokemonData, 
            score, 
            currentRound,
            totalRounds,
            roundScores,
            gameCompleted,
            isLoadingPokemon,
            setShowRules, 
            setGameStarted, 
            startGame, 
            validateGame,
            skipRound,
            loadNewPokemon,
            resetGame,
            clearSession
        }}>
            {children}
        </GameContext.Provider>
    );
}
