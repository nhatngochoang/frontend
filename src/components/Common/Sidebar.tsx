import { Box, Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import assets from 'assets';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const sideBarWidth = 240;

export default function Sidebar() {
   const user = useAppSelector((state) => state.user.value);
   const navigate = useNavigate();

   const logout = () => {
      localStorage.removeItem('token');
      navigate('/login');
   };

   const addBoard = () => {};

   return (
      <>
         <Drawer
            container={window.document.body}
            variant="permanent"
            open={true}
            sx={{
               width: sideBarWidth,
               height: '100vh',
               '& > div': { borderRight: 'none' },
            }}
         >
            <List
               disablePadding
               sx={{
                  width: sideBarWidth,
                  height: '100vh',
                  backgroundColor: assets.colors.secondary,
               }}
            >
               <ListItem>
                  <Box
                     sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}
                  >
                     <Typography variant="body2" fontWeight="700">
                        {user.username}
                     </Typography>
                     <IconButton onClick={logout}>
                        <LogoutOutlinedIcon fontSize="small" />
                     </IconButton>
                  </Box>
               </ListItem>
               <Box sx={{ paddingTop: '10px' }} />
               <Box sx={{ paddingTop: '10px' }} />
               <ListItem>
                  <Box
                     sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                     }}
                  >
                     <Typography variant="body2" fontWeight="700">
                        Private
                     </Typography>
                     <IconButton onClick={addBoard}>
                        <AddBoxOutlinedIcon fontSize="small" />
                     </IconButton>
                  </Box>
               </ListItem>
            </List>
         </Drawer>
      </>
   );
}
