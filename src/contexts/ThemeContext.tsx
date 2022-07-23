import { PropTypes } from '@material-ui/core';
import { createContext, ReactNode, useState } from 'react';

interface ThemeContextProviderProps {
   children: ReactNode;
}

interface ThemeContextDefault {
   theme: PropTypes.Color;
   toggleTheme: (newTheme: PropTypes.Color) => void;
}

const themeDefault = {
   theme: 'primary' as PropTypes.Color,
   toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextDefault>(themeDefault);

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
   const [theme, setTheme] = useState<PropTypes.Color>(themeDefault.theme);

   const toggleTheme = (newTheme: PropTypes.Color) => {
      setTheme(newTheme);
   };
   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
