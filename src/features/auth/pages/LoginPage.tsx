import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
   },
   box: {
      padding: theme.spacing(3), // 1 unit 8px
   },
}));

export function LoginPage() {
   const classes = useStyles();
   const dispatch = useAppDispatch();

   const isLogging = useAppSelector((state) => state.auth.logging);

   const { setCurrentUser, setAuthLoading } = useContext(CurrentUserContext);

   const history = useHistory();

   const handleLoginClick = () => {
      setAuthLoading(true);
      // TODO: Get username + pwd from login form
      dispatch(
         authActions.login({
            username: '',
            password: '',
         })
      );

      const token = localStorage.getItem('login_token');
      if (token) {
         setCurrentUser({
            email: '',
            password: '',
         });
         setAuthLoading(false);
      } else {
         setCurrentUser(
            {
               email: '',
               password: '',
            } || null
         );
         setAuthLoading(false);
      }

      history.push('/admin');
   };

   return (
      <div className={classes.root}>
         <Paper elevation={1} className={classes.box}>
            <Typography variant="h5" component="h1">
               Student Management
            </Typography>
            <Box mt={4}>
               <div>
                  LoginForm
                  <input type="text" />
                  <input type="password" />
               </div>
            </Box>
            <Box mt={4}>
               <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
                  {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
               </Button>
            </Box>
         </Paper>
      </div>
   );
}
