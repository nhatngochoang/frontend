import { Box, Button, Typography, Divider, TextField, IconButton, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Section } from 'models';
import sectionApi from 'api/sectionApi';

type KanbanProps = {
   data?: any;
   boardId?: string;
};

let timer: any;
const timeout = 500;

export default function Kanban({ data, boardId }: KanbanProps) {
   const [sections, setSections] = useState(data ? data : []);

   const createSection = async () => {
      try {
         if (!boardId) return;
         const section = await sectionApi.create(boardId);
         setSections([...data, section]);
      } catch (err) {
         alert(err);
      }
   };

   const deleteSection = async (sectionId: string) => {
      try {
         if (!boardId) return;
         await sectionApi.delete(boardId, sectionId);
         const newData = [...data].filter((e) => e.id !== sectionId);
         setSections(newData);
      } catch (err) {
         alert(err);
      }
   };

   const updateSectionTitle = async (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      sectionId: string
   ) => {
      clearTimeout(timer);
      const newTitle = e.target.value;
      const newData = [...data];
      const index = newData.findIndex((e) => e.id === sectionId);
      newData[index].title = newTitle;
      setSections(newData);

      timer = setTimeout(async () => {
         try {
            if (!boardId) return;
            await sectionApi.update(boardId, sectionId, { title: newTitle });
         } catch (err) {
            alert(err);
         }
      }, timeout);
   };

   const createTask = async (sectionId) => {};

   const onDragEnd = () => {};
   const setSelectedTask = () => {};

   useEffect(() => {
      setSections(data ? data : []);
   }, [data]);

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
            }}
         >
            <Button onClick={createSection}>Add section</Button>
            <Typography variant="body2" fontWeight="700">
               {sections.length} Sections
            </Typography>
         </Box>
         <Divider sx={{ margin: '10px 0' }} />
         <DragDropContext onDragEnd={onDragEnd}>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  width: 'calc(100vw - 400px)',
                  overflowX: 'auto',
               }}
            >
               {sections.map((section: Section) => (
                  <Droppable key={section.id} droppableId={section.id}>
                     {(provided) => (
                        <Box
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           sx={{ width: '300px', padding: '10px', marginRight: '10px' }}
                        >
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                                 marginBottom: '10px',
                              }}
                           >
                              <TextField
                                 value={section.title}
                                 onChange={(e) => updateSectionTitle(e, section.id)}
                                 placeholder="Untitled"
                                 variant="outlined"
                                 sx={{
                                    flexGrow: 1,
                                    '& .MuiOutlinedInput-input': { padding: 0 },
                                    '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                                    '& .MuiOutlinedInput-root': {
                                       fontSize: '1rem',
                                       fontWeight: '700',
                                    },
                                 }}
                              />
                              <IconButton
                                 size="small"
                                 sx={{
                                    color: 'gray',
                                    '&:hover': { color: 'green' },
                                 }}
                                 onClick={() => createTask()}
                              >
                                 <AddOutlinedIcon />
                              </IconButton>
                              <IconButton
                                 size="small"
                                 sx={{
                                    color: 'gray',
                                    '&:hover': { color: 'red' },
                                 }}
                                 onClick={() => deleteSection(section.id)}
                              >
                                 <DeleteOutlinedIcon />
                              </IconButton>
                           </Box>
                           {/* tasks */}

                           {provided.placeholder}
                        </Box>
                     )}
                  </Droppable>
               ))}
            </Box>
         </DragDropContext>
      </>
   );
}
