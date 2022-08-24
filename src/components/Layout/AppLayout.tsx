import { Box } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import Loading from 'components/Common/Loading';
import Sidebar from 'components/Common/Sidebar';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUser } from 'redux/features/userSlice';
import authUtils from 'utils/auth';

export function AppLayout() {
   const naviagte = useNavigate();
   const dispatch = useAppDispatch();
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      const checkAuth = async () => {
         setLoading(true);
         const user = await authUtils.isAuthenticated();

         if (user) {
            dispatch(setUser(user));
            setLoading(false);
         } else {
            naviagte('/login');
         }
      };
      checkAuth();
   }, [naviagte, dispatch]);

   return loading ? (
      <Loading fullHeight />
   ) : (
      <Box
         sx={{
            display: 'flex',
         }}
      >
         <Sidebar />
         <Box
            sx={{
               flexGrow: 1,
               p: 1,
               width: 'max-content',
               marginLeft: '240px',
            }}
         >
            <Outlet />
         </Box>
      </Box>
   );
}
