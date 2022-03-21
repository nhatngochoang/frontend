import { Box, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Header, Sidebar } from '../Common';

export interface AdminLayoutProps {}

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '240px 1fr',
      gridTemplateAreas: `"header header" "sidebar main"`,

      minHeight: '100vh',
   },

   header: {
      gridArea: 'header',
   },
   sidebar: {
      gridArea: 'sidebar',
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
   },
   main: {
      gridArea: 'main',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 3), // topbot + leftright
   },
}));

export function AdminLayout(props: AdminLayoutProps) {
   const classes = useStyles();

   return (
      <Box className={classes.root}>
         <Box className={classes.header}>
            <Header />
         </Box>
         <Box className={classes.sidebar}>
            <Sidebar />
         </Box>
         <Box className={classes.main}>main</Box>
      </Box>
   );
}
