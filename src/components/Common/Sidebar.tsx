import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
   Box,
   Drawer,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   Typography,
   useTheme,
} from '@mui/material';
import boardApi from 'api/boardApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import assets from 'assets';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setBoards } from 'redux/features/boardSlice';
import FavouriteList from './FavouriteList';

const sideBarWidth = 240;

export default function Sidebar() {
   const theme = useTheme();
   const user = useAppSelector((state) => state.user.value);
   const boards = useAppSelector((state) => state.board.value);

   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { boardId } = useParams();
   const [activeIndex, setActiveIndex] = useState(0);

   const logout = () => {
      localStorage.removeItem('token');
      navigate('/login');
   };

   const addBoard = async () => {
      try {
         const res = await boardApi.create();
         const newList = [res, ...boards];
         dispatch(setBoards(newList));
         navigate(`/boards/${res.id}`);
      } catch (err) {
         alert(err);
      }
   };

   const onDragEnd = async ({ source, destination }: any) => {
      if (!destination) {
         return;
      }

      const newBoards = Array.from(boards);

      const [removed] = newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, removed);

      const activeItem = newBoards.findIndex((e) => e.id === boardId);
      setActiveIndex(activeItem);
      dispatch(setBoards(newBoards));

      try {
         await boardApi.updatePosition({ boards: newBoards });
      } catch (err) {
         alert(err);
      }
   };

   useEffect(() => {
      const getBoards = async () => {
         try {
            const res = await boardApi.getAll();
            dispatch(setBoards(res));
         } catch (error) {
            alert(error);
         }
      };
      getBoards();
   }, [dispatch]);

   useEffect(() => {
      const activeItem = boards.findIndex((e) => e.id === boardId);
      if (boards.length > 0 && boardId === undefined) {
         navigate(`/boards/${boards[0].id}`);
      }
      setActiveIndex(activeItem);
   }, [boards, boardId, navigate]);

   return (
      <>
         <Drawer
            container={window.document.body}
            variant="permanent"
            open={true}
            sx={{
               width: sideBarWidth,
               height: '100vh',
               boxShadow:
                  theme.palette.mode === 'light'
                     ? 'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px'
                     : '',
               position: 'fixed',
               '& > div': { borderRight: 'none' },
            }}
         >
            <List
               disablePadding
               sx={{
                  width: sideBarWidth,
                  height: '100vh',
                  backgroundColor:
                     theme.palette.mode === 'dark'
                        ? assets.colors.secondary
                        : assets.colors.primary,
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
               <FavouriteList />
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
               <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable key={'list-board-droppable'} droppableId={'list-board-droppable'}>
                     {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                           {boards.map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                 {(provided, snapshot) => (
                                    <ListItemButton
                                       ref={provided.innerRef}
                                       {...provided.dragHandleProps}
                                       {...provided.draggableProps}
                                       selected={index === activeIndex}
                                       component={Link}
                                       to={`/boards/${item.id}`}
                                       sx={{
                                          pl: '20px',
                                          cursor: snapshot.isDragging
                                             ? 'grab'
                                             : 'pointer!important',
                                       }}
                                    >
                                       <Typography
                                          variant="body2"
                                          fontWeight="700"
                                          sx={{
                                             whiteSpace: 'nowrap',
                                             overflow: 'hidden',
                                             textOverflow: 'ellipsis',
                                          }}
                                       >
                                          {item.icon} {item.title}
                                       </Typography>
                                    </ListItemButton>
                                 )}
                              </Draggable>
                           ))}
                           {provided.placeholder}
                        </div>
                     )}
                  </Droppable>
               </DragDropContext>
            </List>
         </Drawer>
      </>
   );
}
