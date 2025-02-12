import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = ()=>{
    return useContext(ThemeContext);
};

export const ThemeProvider = ({children})=>{

    const storedTheme = localStorage.getItem('theme') || 'light';
    const [theme, setTheme]= useState(storedTheme);

    const toggleTheme =()=>{
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}