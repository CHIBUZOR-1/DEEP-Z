import React, { createContext, useState, useContext, useEffect } from 'react'


const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

    useEffect(() => {
        localStorage.setItem('mode', mode);
        document.documentElement.className = mode;
    }, [mode]);

    const toggleMode = () => {
        setMode(prevMode=> (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode}}>
            {children}
        </ThemeContext.Provider>
    );
};