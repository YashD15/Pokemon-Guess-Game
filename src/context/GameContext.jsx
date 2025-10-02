import { createContext, useEffect, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [showRules, setShowRules] = useState(true);
    const [gameStarted, setGameStarted] = useState(false)
    const [score, setScore] = useState(0)

    const [pokemonData, setPokemonData] = useState({
        name: '',
        region: '',
        types: [],
        moves: [],
        image: ''
    })

    const startGame = async () => {
        setGameStarted(true)
        var id = Math.floor(Math.random() * 809) + 1;
        var pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

        try {

            const pokemonResponse = await fetch(pokemonUrl)
            const data = await pokemonResponse.json()

            var species = await fetch(data.species.url)

            const regionData = await species.json()

            setPokemonData({
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map((type) => type.type.name),
                moves: data.moves.map((move) => move.move.name),
                region: regionData.generation.name
            })
        }
        catch (error) {
            console.error(error, error.message)
        }
    }

    const validateGame = (userData) => {
        let newScore = 0;
        
        // Validate Pokemon name (worth 2 points)
        if (userData.pokemonName.toLowerCase() === pokemonData.name.toLowerCase()) {
            newScore += 2;
        }
        
        // Validate region (worth 1 point)
        if (userData.region === pokemonData.region) {
            newScore += 1;
        }
        
        // Validate type1 (worth 1 point)
        if (pokemonData.types.includes(userData.type1)) {
            newScore += 1;
        }
        
        // Validate type2 (worth 1 point)
        // Check if user selected "none" and Pokemon has only 1 type, or if the type matches
        if (userData.type2.toLowerCase() === 'none' && pokemonData.types.length === 1) {
            newScore += 1;
        } else if (userData.type2.toLowerCase() !== 'none' && pokemonData.types.includes(userData.type2) && userData.type2.toLowerCase() != userData.type1.toLowerCase()) {
            newScore += 1;
        }
        
        // Validate move1 (worth 1 point)
        if (pokemonData.moves.includes(userData.move1.toLowerCase().replace(/\s+/g, '-'))) {
            newScore += 1;
        }
        
        // Validate move2 (worth 1 point)
        if (userData.move1.toLowerCase() != userData.move2.toLowerCase() && pokemonData.moves.includes(userData.move2.toLowerCase().replace(/\s+/g, '-'))) {
            newScore += 1;
        }
        
        // Update the score state
        setScore(newScore);
        
        // Log results for debugging
        console.log('Validation Results:', {
            userData,
            pokemonData,
            totalScore: newScore
        });
        alert("Score: " + newScore);
        setGameStarted(false)
        setShowRules(true)
    }

    return (
        <GameContext.Provider value={{ gameStarted, showRules, pokemonData, score, setShowRules, setGameStarted, startGame, validateGame }}>
            {children}
        </GameContext.Provider>
    );
}
