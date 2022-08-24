import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/system';
import assets from 'assets';
import Loading from 'components/Common/Loading';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from 'utils/auth';
export function AuthLayout() {
   const naviagte = useNavigate();
   const theme = useTheme();

   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      const checkAuth = async () => {
         setLoading(true);
         const isAuth = await authUtils.isAuthenticated();

         if (isAuth) {
            naviagte('/');
         } else {
            setLoading(false);
         }
      };
      checkAuth();
   }, [naviagte]);

   return loading ? (
      <Loading fullHeight />
   ) : (
      <Container component="main" maxWidth="xs">
         <Box
            sx={{
               marginTop: 8,
               display: 'flex',
               alignItems: 'center',
               flexDirection: 'column',
            }}
         >
            <img
               src={
                  theme.palette.mode === 'light' ? assets.images.logolight : assets.images.logoDark
               }
               style={{ width: '100px' }}
               alt="app logo"
            />
            <Outlet />
         </Box>
      </Container>
   );
}
