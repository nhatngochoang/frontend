import {
   AppBar,
   Box,
   Button,
   Chip,
   createStyles,
   Fab,
   FormControl,
   makeStyles,
   MenuItem,
   Select,
   Theme,
   Toolbar,
   Typography,
} from '@material-ui/core';
import { ProgressContext } from 'contexts/ProgressContext';
import { ThemeContext } from 'contexts/ThemeContext';
import * as React from 'react';
import WelcomeMessage from './WelcomeMessage';

export interface NavBarProps {}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      positionSelect: {
         color: 'white',
         borderBottom: '1px solid white',
      },
      floatButton: {
         position: 'fixed',
         bottom: '3rem',
         right: '3rem',
      },
   })
);

export default function NavBar(props: NavBarProps) {
   const classes = useStyles();

   const { lastTime, status } = React.useContext(ProgressContext);
   const { theme, toggleTheme } = React.useContext(ThemeContext);

   const [position, setPosition] = React.useState<string>('Front-end');

   const onPositionChange = React.useCallback(
      (event: React.ChangeEvent<{ value: unknown }>) => {
         setPosition(event.target.value as string);
      },
      [setPosition]
   );

   return (
      <AppBar position="static" color={theme}>
         <Fab
            color={theme}
            variant="extended"
            className={classes.floatButton}
            onClick={() => toggleTheme(theme === 'primary' ? 'secondary' : 'primary')}
         >
            Toggle Theme
         </Fab>
         <Toolbar>
            <Box display="flex" justifyContent="space-between" alignItems="center" width={1} py={2}>
               <Typography variant="h6">My movies</Typography>
               <Box textAlign="center">
                  <WelcomeMessage position={position}></WelcomeMessage>
                  <Chip label={`Status: ${status} - Time: ${lastTime}`} />
                  <Box mt={1}>
                     <FormControl>
                        <Select
                           value={position}
                           onChange={onPositionChange}
                           className={classes.positionSelect}
                        >
                           <MenuItem value="Front-end">Front-end Developer</MenuItem>
                           <MenuItem value="Back-end">Back-end Developer</MenuItem>
                           <MenuItem value="Full-stack">Full-stack Developer</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>
               </Box>
               <Box textAlign="center">
                  <Button variant="contained">Login</Button>
               </Box>
            </Box>
         </Toolbar>
      </AppBar>
   );
}
