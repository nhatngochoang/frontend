import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './assets/css/custom-scrollbar.css';
import './assets/css/custom-editor.css';

import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppLayout } from 'components/Layout/AppLayout';
import { AuthLayout } from 'components/Layout/AuthLayout';
import Login from 'pages/Auth/Login';
import Signup from 'pages/Auth/Signup';
import Board from 'pages/Board';
import Home from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
   const theme = createTheme({
      palette: { mode: 'dark' },
   });

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
                  <Route path="boards/:boardId" element={<Board />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   );
}
export default App;
