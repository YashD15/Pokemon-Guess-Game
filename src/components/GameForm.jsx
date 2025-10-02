import React, { useContext, useState } from 'react'
import { GameContext } from '../context/GameContext';

const GameForm = () => {

    const {validateGame} = useContext(GameContext)
    // State for form data
    const [formData, setFormData] = useState({
        pokemonName: '',
        region: '',
        type1: '',
        type2: '',
        move1: '',
        move2: ''
    });

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

    const handleSubmit = () => {
        validateGame(formData)
    }

    return (
        <form action={handleSubmit} className='w-full px-2 space-y-3'>
            <div className="form-row w-full">
                <label htmlFor="pokemonName">Pokemon Name:</label>
                <input 
                    required
                    type="text" 
                    name="pokemonName" 
                    className='form-input' 
                    id="pokemonName"
                    value={formData.pokemonName}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row w-full">
                <label htmlFor="region">Region:</label>
                <select 
                    required
                    className="form-input" 
                    aria-label="Default select example" 
                    id="region"
                    value={formData.region}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Region</option>
                    <option value="generation-i">Kanto</option>
                    <option value="generation-ii">Johto</option>
                    <option value="generation-iii">Hoenn</option>
                    <option value="generation-iv">Sinnoh</option>
                    <option value="generation-v">Unova</option>
                    <option value="generation-vi">Kalos</option>
                    <option value="generation-vii">Alola</option>
                </select>
            </div>
            <div className='form-row w-full'>
                <label htmlFor="types" className='col-span-2 mb-2'>Type 1 & 2:</label>
                <select 
                    required
                    className="form-input" 
                    aria-label="Default select example" 
                    id="type1"
                    value={formData.type1}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Type 1</option>
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
                    aria-label="Default select example" 
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
            <div className='form-row w-full'>
                <label htmlFor="moves" className='col-span-2 mb-2'>Learnable Moves:</label>
                <input 
                    required
                    type="text" 
                    name="move1" 
                    id="move1" 
                    className='form-input' 
                    placeholder='Move 1'
                    value={formData.move1}
                    onChange={handleInputChange}
                />
                <input 
                    required
                    type="text" 
                    name="move2" 
                    id="move2" 
                    className='form-input' 
                    placeholder='Move 2'
                    value={formData.move2}
                    onChange={handleInputChange}
                />
            </div>
            <input type="submit" value="Submit" className='px-3 py-1.5 mx-auto border-[1px] border-blue-500 rounded-md block font-medium text-blue-500' />
        </form>
    )
}

export default GameForm
