import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext';

const Rules = () => {
    const { showRules, gameStarted, startGame, setShowRules } = useContext(GameContext);

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
        <div className={`w-[90%] max-w-xl rounded-md p-2 shadow-md shadow-gray-400 mx-auto my-4 transition-all ease-in-out duration-300 ${!showRules ? 'hidden' : 'block'} ${gameStarted && 'absolute z-50 backdrop-blur-md left-1/2 -translate-x-1/2'}`}>
            <div className="w-full mb-2">
                <p className='text-center text-xl mb-2'>Read this <b>Instructions</b> before you Start Game:</p>
                <ul id='rules' className='space-y-2 list-disc list-inside'>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Pokemon Name</b> - Enter Name of Pokemon given in Image.</span> <span className='points w-fit font-bold'>2 Points</span></li>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Region</b> - Select region where above Pokemon was First Introduced.</span> <span className='points w-fit font-bold'>1 Point</span></li>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Type 1 & 2</b> - Select 2 Types of above Pokemon. If Pokemon is <i>Single type</i> then select second type as <i>NONE</i>.</span> <span className='points w-fit font-bold'>1 Point</span></li>
                    <li className='flex gap-x-4 justify-between'><span className='flex-1 text-justify leading-snug'><b>Learnable Moves</b> - Enter any 2 moves which above Pokemon can Learn.</span> <span className='points w-fit font-bold'>1 Point</span></li>
                    <li className='flex gap-x-4 justify-between font-bold'><span>Total per Round:</span> <span>7 Points</span></li>
                </ul>
            </div>
            <button className="w-fit p-2 bg-blue-700 text-white font-medium rounded mx-auto block" onClick={handleClick}>{gameStarted ? 'Back to Game' : ' Start Game'}</button>
        </div>
    )
}

export default Rules
