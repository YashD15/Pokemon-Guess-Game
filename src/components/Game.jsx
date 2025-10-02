import React, { useContext } from 'react'
import PokiImage from './PokiImage'
import { GameContext } from '../context/GameContext'
import GameForm from './GameForm'

const Game = () => {
  const { gameStarted } = useContext(GameContext)
  return (
    <section className={`w-full max-w-2xl mx-auto flex flex-col gap-y-2 items-center ${gameStarted ? 'block' : 'hidden'}`}>
      <PokiImage />
      <GameForm />
    </section>
  )
}

export default Game
