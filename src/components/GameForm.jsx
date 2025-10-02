import React, { useContext, useState } from 'react'
import { GameContext } from '../context/GameContext';

const GameForm = () => {

    const { validateGame, skipRound, currentRound, isLoadingPokemon, resetGame } = useContext(GameContext)
    // State for form data
    const [formData, setFormData] = useState({
        pokemonName: '',
        region: '',
        type1: '',
        type2: '',
        move1: '',
        move2: ''
    });

    // Reset form when round changes
    React.useEffect(() => {
        setFormData({
            pokemonName: '',
            region: '',
            type1: '',
            type2: '',
            move1: '',
            move2: ''
        });
    }, [currentRound]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle select changes
    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateGame(formData)
    }

    const handleSkip = () => {
        skipRound()
    }

    return (
        <form onSubmit={handleSubmit} className={`w-full max-w-2xl px-4 space-y-4 ${isLoadingPokemon ? 'opacity-50 pointer-events-none' : ''}`}>
            {/* Pokemon Name and Region Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="w-full">
                    <label htmlFor="pokemonName" className="block text-sm font-medium text-gray-700 mb-2">Pokémon Name:</label>
                    <input
                        required
                        type="text"
                        name="pokemonName"
                        className='form-input w-full'
                        id="pokemonName"
                        placeholder="e.g., Pikachu"
                        value={formData.pokemonName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">Region:</label>
                    <select
                        required
                        className="form-input w-full"
                        aria-label="Region select"
                        id="region"
                        value={formData.region}
                        onChange={handleSelectChange}
                    >
                        <option value="" disabled>Select Region</option>
                        <option value="generation-i">Kanto</option>
                        <option value="generation-ii">Johto</option>
                        <option value="generation-iii">Hoenn</option>
                        <option value="generation-iv">Sinnoh</option>
                        <option value="generation-v">Unova</option>
                        <option value="generation-vi">Kalos</option>
                        <option value="generation-vii">Alola</option>
                    </select>
                </div>
            </div>
            {/* Types Row */}
            <div className='w-full'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Pokémon Types:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                        required
                        className="form-input"
                        aria-label="Type 1"
                        id="type1"
                        value={formData.type1}
                        onChange={handleSelectChange}
                    >
                        <option value="" disabled>Type 1 (Required)</option>
                        <option value="normal">Normal</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="ice">Ice</option>
                        <option value="fighting">Fighting</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="flying">Flying</option>
                        <option value="psychic">Psychic</option>
                        <option value="bug">Bug</option>
                        <option value="rock">Rock</option>
                        <option value="ghost">Ghost</option>
                        <option value="dark">Dark</option>
                        <option value="dragon">Dragon</option>
                        <option value="steel">Steel</option>
                        <option value="fairy">Fairy</option>
                    </select>
                    <select
                        className="form-input"
                        aria-label="Type 2"
                        id="type2"
                        value={formData.type2}
                        onChange={handleSelectChange}
                    >
                        <option value="" disabled>Type 2 (Or None)</option>
                        <option value="none">None</option>
                        <option value="normal">Normal</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="ice">Ice</option>
                        <option value="fighting">Fighting</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="flying">Flying</option>
                        <option value="psychic">Psychic</option>
                        <option value="bug">Bug</option>
                        <option value="rock">Rock</option>
                        <option value="ghost">Ghost</option>
                        <option value="dark">Dark</option>
                        <option value="dragon">Dragon</option>
                        <option value="steel">Steel</option>
                        <option value="fairy">Fairy</option>
                    </select>
                </div>
            </div>

            {/* Moves Row */}
            <div className='w-full'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Learnable Moves:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                        required
                        type="text"
                        name="move1"
                        id="move1"
                        className='form-input'
                        placeholder='Move 1 (e.g., Tackle)'
                        value={formData.move1}
                        onChange={handleInputChange}
                    />
                    <input
                        required
                        type="text"
                        name="move2"
                        id="move2"
                        className='form-input'
                        placeholder='Move 2 (e.g., Thunder Shock)'
                        value={formData.move2}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="flex gap-4 justify-center pt-2">
                <input
                    type="submit"
                    value={isLoadingPokemon ? "Loading..." : "Submit Answer"}
                    disabled={isLoadingPokemon}
                    className='px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md'
                />
                <button
                    type="button"
                    onClick={handleSkip}
                    disabled={isLoadingPokemon}
                    className='px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md'
                >
                    {isLoadingPokemon ? "Loading..." : "Skip Round"}
                </button>
            </div>
            <div className="flex justify-center gap-4 mt-1">
                <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                    Reset Game
                </button>
            </div>
        </form>
    )
}

export default GameForm
