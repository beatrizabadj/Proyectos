import React, { useContext } from 'react'
import { DarkModeContext } from '../context/theme.context';
import {motion} from 'framer-motion';
import "./ToggleSwitch.scss";

function ToggleSwitch() {
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    
    return (
    <button className={darkMode ? "switch-btn dark" : "switch-btn"}
        role="switch"
        onClick={toggleDarkMode}
        aria-checked={darkMode}
        style={{justifyContent: darkMode ? 'flex-end' : 'flex-start'}}
    >
        <motion.span
            layout
            className='thumb'
            animate={{ x: darkMode ? 8 : -5 }}
            transition={{type:"spring"}}
        />
    </button>
  )
}

export default ToggleSwitch