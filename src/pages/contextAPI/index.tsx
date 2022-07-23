import MovieContextProvider from 'contexts/MovieContext';
import ProgressContextProvider from 'contexts/ProgressContext';
import ThemeContextProvider from 'contexts/ThemeContext';
import Movies from './components/Movie';
import NavBar from './components/NavBar';
import './style.css';

export default function ContextAPI() {
   return (
      <>
         <MovieContextProvider>
            <ThemeContextProvider>
               <ProgressContextProvider>
                  <NavBar />
                  <Movies />
               </ProgressContextProvider>
            </ThemeContextProvider>
         </MovieContextProvider>
      </>
   );
}
