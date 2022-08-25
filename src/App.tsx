import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { PaletteMode } from '@mui/material';
import CssBaseLine from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'assets/css/custom-scrollbar.css';
import { AppLayout } from 'components/Layout/AppLayout';
import { AuthLayout } from 'components/Layout/AuthLayout';
import Login from 'pages/Auth/Login';
import Signup from 'pages/Auth/Signup';
import Board from 'pages/Board';
import Home from 'pages/Home';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
   const [mode, setMode] = useState<PaletteMode>('dark');
   const theme = createTheme({
      palette: { mode: mode },
      typography: {
         fontFamily: [
            'Cascadia Code',
            'Nunito',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'sans-serif',
         ].join(','),
      },
   });

   const toggleMode = () => {
      setMode(mode === 'light' ? 'dark' : 'light');
   };

   return (
      <ThemeProvider theme={theme}>
         <CssBaseLine />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
               </Route>
               <Route path="/" element={<AppLayout />}>
                  <Route index element={<Home />} />
                  <Route path="boards" element={<Home />} />
                  <Route path="boards/:boardId" element={<Board toggleMode={toggleMode} />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   );
}
export default App;
