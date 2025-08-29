import React, { createContext, useState } from 'react'

const DarkModeContext = createContext();

function DarkModeProviderWrapper(props) {

    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode=()=>{
        setDarkMode(!darkMode);
    };

  return (
    <DarkModeContext.Provider value={{darkMode, setDarkMode, toggleDarkMode}}>
        {props.children}
    </DarkModeContext.Provider>
  );
}

export {DarkModeContext, DarkModeProviderWrapper};