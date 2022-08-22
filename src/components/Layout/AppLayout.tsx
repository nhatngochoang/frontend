import { Box } from '@mui/material';
import Loading from 'components/Common/Loading';
import Sidebar from 'components/Common/Sidebar';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from 'utils/auth';
export interface AppLayoutProps {}

export function AppLayout(props: AppLayoutProps) {
   const naviagte = useNavigate();
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      const checkAuth = async () => {
         setLoading(true);
         const isAuth = await authUtils.isAuthenticated();

         if (isAuth) {
            setLoading(false);
         } else {
            naviagte('/login');
         }
      };
      checkAuth();
   }, [naviagte]);

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
            }}
         >
            <Outlet />
         </Box>
      </Box>
   );
}
