import React, { useContext } from 'react'
import PokiImage from './PokiImage'
import { GameContext } from '../context/GameContext'
import GameForm from './GameForm'

const Game = () => {
  const { gameStarted, currentRound, totalRounds, score, roundScores, isLoadingPokemon, resetGame } = useContext(GameContext)
  
  return (
    <section className={`w-full max-w-4xl mx-auto  ${gameStarted ? 'block' : 'hidden'}`}>
      {/* Compact Game Info Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Round {currentRound} of {totalRounds}
              {isLoadingPokemon && <span className="animate-pulse ml-2">⚡</span>}
            </h2>
            <p className="text-blue-100">
              Score: {score}/{Math.max((currentRound - 1) * 7, roundScores.length * 7)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{Math.round((score / Math.max((currentRound - 1) * 7, roundScores.length * 7, 1)) * 100)}%</div>
            <p className="text-blue-100 text-sm">Accuracy</p>
          </div>
        </div>
        
        {/* Compact Progress Indicators */}
        <div className="flex gap-2 mt-3">
          {Array.from({ length: totalRounds }, (_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full ${
                index + 1 < currentRound 
                  ? 'bg-green-400' 
                  : index + 1 === currentRound 
                  ? 'bg-yellow-400 animate-pulse' 
                  : 'bg-white/30'
              }`}
            ></div>
          ))}
        </div>
        
        {isLoadingPokemon && (
          <div className="text-center mt-2">
            <span className="text-sm text-blue-100 animate-pulse">Loading next Pokémon...</span>
          </div>
        )}
      </div>

      {/* Game Content */}
      <div className="flex items-center justify-between gap-6">
        <PokiImage />
        <GameForm />
      
      </div>
    </section>
  )
}

export default Game
