import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

const PokiImage = () => {
  const { pokemonData } = useContext(GameContext)
  const pokiImg = pokemonData.image
  return (
    <div className='w-44 h-44 bg-gray-300 flex items-center justify-center rounded border-2'>
      {(pokiImg != '')
        ? <img src={pokiImg} className='h-full w-full flex items-center justify-center' alt="Pokemon" />
        :
        <div className="w-full h-full rounded-md bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
      }
    </div>
  )
}

export default PokiImage
