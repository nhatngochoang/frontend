import { ReactNode, useReducer, createContext } from 'react';
import { topMovieReducer, TopMovieState, TopMovieActionType } from '../reducers';
import topMoviesInfo from '../api/getTopMovies';

interface TopMovieContextProps {
   children: ReactNode;
}

interface TopMovieContextDefault {
   topMovies: TopMovieState;
   getTopMovies: () => Promise<void>; // or: () => void
   toggleWatched: (id: string) => void;
}

const topMoviesDefault: TopMovieState = [];

export const TopMovieContext = createContext<TopMovieContextDefault>({
   topMovies: topMoviesDefault,
   getTopMovies: () => Promise.resolve(void 0), // then here it can be () => null or () => {}
   toggleWatched: () => null,
});

const TopMovieContextProvider = ({ children }: TopMovieContextProps) => {
   const [topMovies, dispatch] = useReducer(topMovieReducer, topMoviesDefault);

   // get top movies
   const getTopMovies = async () => {
      const topMovies = await Promise.all(topMoviesInfo);

      dispatch({
         type: TopMovieActionType.GET_TOP_MOVIES,
         payload: topMovies.map((topMovie) => ({ ...topMovie.data, Watched: false })),
      });
   };

   // toggle watched
   const toggleWatched = (imdbID: string) => {
      dispatch({ type: TopMovieActionType.TOGGLE_TOP_MOVIE_WATCHED, payload: imdbID });
   };

   const topMovieContextData = {
      topMovies,
      getTopMovies,
      toggleWatched,
   };

   return (
      <TopMovieContext.Provider value={topMovieContextData}>{children}</TopMovieContext.Provider>
   );
};

export default TopMovieContextProvider;
