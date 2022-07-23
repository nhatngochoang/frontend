import { Grid } from '@material-ui/core';
import AuthContextProvider from 'contexts/AuthContext';
import MovieContextProvider from 'contexts/MovieContext';
import ProgressContextProvider from 'contexts/ProgressContext';
import ThemeContextProvider from 'contexts/ThemeContext';
import TopMovieContextProvider from 'contexts/TopMovieContext';
import Movies from './components/Movie';
import NavBar from './components/NavBar';
import TopMovies from './components/TopMovies';
import './style.css';

export default function ContextAPI() {
   return (
      <>
         <TopMovieContextProvider>
            <AuthContextProvider>
               <MovieContextProvider>
                  <ThemeContextProvider>
                     <ProgressContextProvider>
                        <NavBar />
                        <Grid container>
                           <Grid item xs={4}>
                              <TopMovies />
                           </Grid>
                           <Grid item xs={8}>
                              <Movies />
                           </Grid>
                        </Grid>
                     </ProgressContextProvider>
                  </ThemeContextProvider>
               </MovieContextProvider>
            </AuthContextProvider>
         </TopMovieContextProvider>
      </>
   );
}
