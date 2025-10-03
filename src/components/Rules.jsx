import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext';

const Rules = () => {
    const { showRules, gameStarted, startGame, setShowRules, currentRound, score, resetGame } = useContext(GameContext);
    
    // Check if there's a saved session
    const hasSavedSession = gameStarted && currentRound > 1;

    const handleClick = () => {
        if (gameStarted) {
            setShowRules(false)
        }
        else {
            startGame()
            setShowRules(false)
        }
    }
    return (
        <div className={`w-[90%] max-w-xl rounded-md p-4 shadow-md shadow-gray-400 mx-auto my-4 transition-all ease-in-out duration-300 ${!showRules ? 'hidden' : 'block'} ${gameStarted && 'absolute z-50 backdrop-blur-md left-1/2 -translate-x-1/2'}`}>
            {/* Session Restore Notification */}
            {hasSavedSession && (
                <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-4 rounded">
                    <p className="text-center text-lg font-bold text-green-800">🎯 Game Session Restored!</p>
                    <p className="text-center text-sm text-green-700">
                        Round {currentRound} • Score: {score} • Your progress has been saved!
                    </p>
                    <div className="flex gap-2 justify-center mt-2">
                        <button 
                            onClick={() => setShowRules(false)}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        >
                            Continue Game
                        </button>
                        <button 
                            onClick={resetGame}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                        >
                            Start Fresh
                        </button>
                    </div>
                </div>
            )}

            <div className="w-full mb-2">
                <p className='text-center text-xl mb-2'>Read this <b>Instructions</b> before you Start Game:</p>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded">
                    <p className="text-center text-lg font-bold text-yellow-800">🎮 5-Round Pokemon Guessing Game 🎮</p>
                    <p className="text-center text-sm text-yellow-700">Guess 5 different Pokémon one-by-one • No time limit! • Auto-saves progress!</p>
                </div>
                <ul id='rules' className='space-y-2 list-disc list-inside'>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Pokemon Name</b> - Enter Name of Pokemon given in Image.</span> <span className='points w-fit font-bold'>2 Points</span></li>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Region</b> - Select region where above Pokemon was First Introduced.</span> <span className='points w-fit font-bold'>1 Point</span></li>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Type 1 & 2</b> - Select 2 Types of above Pokemon. If Pokemon is <i>Single type</i> then select second type as <i>NONE</i>.</span> <span className='points w-fit font-bold'>1 Point</span></li>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Learnable Moves</b> - Enter any 2 moves which above Pokemon can Learn.</span> <span className='points w-fit font-bold'>1 Point</span></li>
                    <li className='flex gap-x-4 justify-between font-bold'><span>Total per Round:</span> <span>7 Points</span></li>
                    <li className='flex gap-x-4 justify-between font-bold text-blue-600'><span>Maximum Total Score:</span> <span>35 Points (5 rounds × 7 points)</span></li>
                </ul>
            </div>
            
            {!hasSavedSession && (
                <button className="w-fit p-2 bg-blue-700 text-white font-medium rounded mx-auto block hover:bg-blue-800 transition-colors" onClick={handleClick}>
                    {gameStarted ? 'Back to Game' : 'Start Game'}
                </button>
            )}
        </div>
    )
}

export default Rules
