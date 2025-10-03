import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

const Header = () => {
  const { setShowRules } = useContext(GameContext)
  return (
    <header className='w-full h-16 p-2 flex items-center justify-between border-b-2 border-gray-300 shadow-md'>
        <div id="logo" className='h-full flex items-center gap-x-1'>
            <img src="/icon.png" className='h-full' alt="Logo" />
            <h2 className='text-2xl font-bold font-mono bg-gradient-to-r from-blue-700 to-red-500 bg-clip-text text-transparent'>PokeGame</h2>
        </div>
        <button className='p-2 rounded-md bg-blue-700 font-mono font-bold text-white' onClick={()=>setShowRules((prev) => !prev)}>Rules</button>
    </header>
  )
}

export default Header
