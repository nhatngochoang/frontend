import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';

export default function Home() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState(false);

   const createBoard = () => {};
   return (
      <>
         <Box
            sx={{
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <LoadingButton
               variant="outlined"
               color="success"
               onClick={createBoard}
               loading={loading}
            >
               Click here to create your first board
            </LoadingButton>
         </Box>
      </>
   );
}
