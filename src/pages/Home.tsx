import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import boardApi from 'api/boardApi';
import { useAppDispatch } from 'app/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setBoards } from 'redux/features/boardSlice';

export default function Home() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [loading, setLoading] = useState(false);

   const createBoard = async () => {
      setLoading(true);
      try {
         const res = await boardApi.create();
         dispatch(setBoards([res]));
         navigate(`/boards/${res.id}`);
      } catch (err) {
         alert(err);
      } finally {
         setLoading(false);
      }
   };

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
