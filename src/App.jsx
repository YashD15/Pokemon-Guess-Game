import React from 'react'
import Header from './components/Header'
import Rules from './components/Rules'
import { GameProvider } from './context/GameContext';
import Game from './components/Game';
import './App.css'

const App = () => {
  return (
    <GameProvider>
      <div className='w-screen scroll-smooth' style={{ scrollbarGutter: 'stable' }}>
        <Header />
        <main className='py-4'>
          <Rules />
          <Game />
        </main>
      </div>
    </GameProvider>
  )
}

export default App
