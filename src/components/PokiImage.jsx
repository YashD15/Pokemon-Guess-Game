import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

const PokiImage = () => {
  const { pokemonData, isLoadingPokemon } = useContext(GameContext)
  const pokiImg = pokemonData.image
  
  return (
    <div className='w-52 h-52 bg-gray-300 flex items-center justify-center rounded border-2 shadow-lg'>
      {(pokiImg != '' && !isLoadingPokemon)
        ? <img src={pokiImg} className='h-full w-full object-contain' alt="Pokemon" />
        :
        <div className="w-full h-full rounded-md bg-gray-200 relative overflow-hidden">
          {/* Skeleton Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          
          {/* Skeleton Shape - Pokemon silhouette */}
          <div className="absolute inset-4 bg-gray-300 rounded-full opacity-50"></div>
          <div className="absolute inset-6 bg-gray-400 rounded-full opacity-30"></div>
          
          {/* Loading Text */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-xs text-gray-500 font-medium">Loading Pokemon...</span>
          </div>
        </div>
      }
    </div>
  )
}

export default PokiImage
