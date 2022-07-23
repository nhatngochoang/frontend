import {
   AppBar,
   Box,
   Button,
   createStyles,
   FormControl,
   makeStyles,
   MenuItem,
   Select,
   Theme,
   Toolbar,
   Typography,
} from '@material-ui/core';
import * as React from 'react';
import WelcomeMessage from './WelcomeMessage';

export interface NavBarProps {}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      positionSelect: {
         color: 'white',
         borderBottom: '1px solid white',
      },
   })
);

export default function NavBar(props: NavBarProps) {
   const classes = useStyles();
   const [position, setPosition] = React.useState<string>('Front-end');

   const onPositionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setPosition(event.target.value as string);
   };

   return (
      <AppBar position="static" color="primary">
         <Toolbar>
            <Box display="flex" justifyContent="space-between" alignItems="center" width={1} py={2}>
               <Typography variant="h6">My movies</Typography>
               <Box textAlign="center">
                  <WelcomeMessage position={position}></WelcomeMessage>
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
