import React, { useContext } from 'react'
import { DarkModeContext } from '../context/theme.context';

function ToggleSwitch() {
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    
    return (
    <label className="switch">
        <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
        />
        <span className='slider round'></span>
    </label>
  )
}

export default ToggleSwitch