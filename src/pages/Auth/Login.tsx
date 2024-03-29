import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField } from '@mui/material';
import authApi from 'api/authApi';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [usernameErrText, setUsernameErrText] = useState('');
   const [passwordErrText, setPasswordErrText] = useState('');

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setUsernameErrText('');
      setPasswordErrText('');

      const data = new FormData(e.currentTarget);
      const username = data.get('username') as string;
      const password = data.get('password') as string;

      let err = false;

      if (username === '') {
         err = true;
         setUsernameErrText('Please fill this field');
      }
      if (password === '') {
         err = true;
         setPasswordErrText('Please fill this field');
      }

      if (err) return;

      setLoading(true);

      try {
         const res = await authApi.login({ username: username.trim(), password: password.trim() });
         setLoading(false);
         localStorage.setItem('token', res.token);
         navigate('/');
      } catch (err: any) {
         const errors = err.data.errors;
         errors.forEach((e: any) => {
            if (e.param === 'username') {
               setUsernameErrText(e.msg);
            }
            if (e.param === 'password') {
               setPasswordErrText(e.msg);
            }
         });
         setLoading(false);
      }
   };

   return (
      <>
         <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
            <TextField
               margin="normal"
               required
               fullWidth
               id="username"
               label="Username"
               name="username"
               disabled={loading}
               error={usernameErrText !== ''}
               helperText={usernameErrText}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               id="password"
               label="Password"
               name="password"
               type="password"
               disabled={loading}
               error={passwordErrText !== ''}
               helperText={passwordErrText}
            />
            <LoadingButton
               sx={{ mt: 3, mb: 2 }}
               variant="outlined"
               fullWidth
               color="success"
               type="submit"
               loading={loading}
            >
               Login
            </LoadingButton>
         </Box>
         <Button component={Link} to="/signup" sx={{ textTransform: 'none' }}>
            Don't have an account? Signup
         </Button>
      </>
   );
};

export default Login;
