import {
   Box,
   Card,
   CardContent,
   CardHeader,
   Checkbox,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   PropTypes,
} from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeContext } from 'contexts/ThemeContext';
import { TopMovieContext } from 'contexts/TopMovieContext';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      topMoviesHeader: {
         paddingBottom: 0,
      },
      topMoviesList: {
         paddingTop: 0,
      },
      topMovieItem: {
         paddingTop: '2px',
         paddingBottom: '2px',
      },
   })
);

const TopMovies = () => {
   const classes = useStyles();

   const { topMovies, getTopMovies, toggleWatched } = useContext(TopMovieContext);

   const { theme } = useContext(ThemeContext);

   const checkboxTheme = theme as Exclude<PropTypes.Color, 'inherit'>;

   const cardHeaderTheme = theme as Exclude<PropTypes.Color, 'default'>;

   useEffect(() => {
      getTopMovies();
   }, []);

   return (
      <Box mt={1} ml={2}>
         <Card raised>
            <CardHeader
               title="Top 10 movies of all time"
               className={classes.topMoviesHeader}
               titleTypographyProps={{
                  variant: 'h4',
                  align: 'center',
                  color: cardHeaderTheme,
               }}
            />
            <CardContent className={classes.topMoviesList}>
               <List>
                  {topMovies.map((movie) => (
                     <ListItem
                        button
                        key={movie.imdbID}
                        className={classes.topMovieItem}
                        onClick={toggleWatched.bind(this, movie.imdbID)}
                     >
                        <ListItemIcon>
                           <Checkbox checked={movie.Watched} color={checkboxTheme} />
                        </ListItemIcon>
                        <ListItemText primary={movie.Title} />
                     </ListItem>
                  ))}
               </List>
            </CardContent>
         </Card>
      </Box>
   );
};

export default TopMovies;
