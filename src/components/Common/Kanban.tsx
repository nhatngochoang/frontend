import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Box, Button, Card, Divider, IconButton, TextField, Typography } from '@mui/material';
import sectionApi from 'api/sectionApi';
import taskApi from 'api/taskApi';
import { Section, Task } from 'models';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';

type KanbanProps = {
   data?: any;
   boardId?: string;
};

let timer: any;
const timeout = 500;

export default function Kanban({ data, boardId }: KanbanProps) {
   const [sections, setSections] = useState(data ? data : []);
   const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

   const createSection = async () => {
      try {
         if (!boardId) return;
         const section = await sectionApi.create(boardId);
         setSections([...sections, section]);
      } catch (err) {
         alert(err);
      }
   };

   const deleteSection = async (sectionId: string) => {
      try {
         if (!boardId) return;
         await sectionApi.delete(boardId, sectionId);
         const newSections = [...sections].filter((e) => e.id !== sectionId);
         setSections(newSections);
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
      const newSections = [...sections];
      const index = newSections.findIndex((e) => e.id === sectionId);
      newSections[index].title = newTitle;
      setSections(newSections);

      timer = setTimeout(async () => {
         try {
            if (!boardId) return;
            await sectionApi.update(boardId, sectionId, { title: newTitle });
         } catch (err) {
            alert(err);
         }
      }, timeout);
   };

   const createTask = async (sectionId: string) => {
      try {
         if (!boardId) return;
         const task = await taskApi.create(boardId, { sectionId });
         const newSections = [...sections];
         const index = newSections.findIndex((e) => e.id === sectionId);
         newSections[index].tasks.unshift(task);
         setSections(newSections);
      } catch (err) {
         alert(err);
      }
   };

   const onUpdateTask = (task: Task) => {
      const newSections = [...sections];
      const sectionIndex = newSections.findIndex((e) => e.id === task.section.id);
      const taskIndex = newSections[sectionIndex].tasks.findIndex((e: Task) => e.id === task.id);
      newSections[sectionIndex].tasks[taskIndex] = task;
      setSections(newSections);
   };

   const onDeleteTask = (task: Task) => {
      const newSections = [...sections];
      const sectionIndex = newSections.findIndex((e) => e.id === task.section.id);
      const taskIndex = newSections[sectionIndex].tasks.findIndex((e: Task) => e.id === task.id);
      newSections[sectionIndex].tasks.splice(taskIndex, 1);
      setSections(newSections);
   };

   const onDragEnd = async ({ source, destination }: any) => {
      if (!destination) return;
      const sourceColumnIndex = sections.findIndex((e: any) => e.id === source.droppableId);
      const destinationColumnIndex = sections.findIndex(
         (e: any) => e.id === destination.droppableId
      );
      const sourceColumn = sections[sourceColumnIndex];
      const destinationColumn = sections[destinationColumnIndex];

      const sourceSectionId = sourceColumn.id;
      const destinationSectionId = destinationColumn.id;

      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationColumn.tasks];

      if (source.droppableId !== destination.droppableId) {
         const [removed] = sourceTasks.splice(source.index, 1);
         destinationTasks.splice(destination.index, 0, removed);
         sections[sourceColumnIndex].tasks = sourceTasks;
         sections[destinationColumnIndex].tasks = destinationTasks;
      } else {
         const [removed] = destinationTasks.splice(source.index, 1);
         destinationTasks.splice(destination.index, 0, removed);
         sections[destinationColumnIndex].tasks = destinationTasks;
      }

      try {
         if (!boardId) return;
         await taskApi.updatePosition(boardId, {
            resourceList: sourceTasks,
            destinationList: destinationTasks,
            resourceSectionId: sourceSectionId,
            destinationSectionId: destinationSectionId,
         });
         setSections(sections);
      } catch (err) {
         alert(err);
      }
   };

   useEffect(() => {
      setSections(data);
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
                                 onClick={() => createTask(section.id)}
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
                           {section.tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                 {(provided, snapshot) => (
                                    <Card
                                       ref={provided.innerRef}
                                       {...provided.draggableProps}
                                       {...provided.dragHandleProps}
                                       sx={{
                                          padding: '10px',
                                          marginBottom: '10px',
                                          cursor: snapshot.isDragging
                                             ? 'grab'
                                             : 'pointer!important',
                                       }}
                                       onClick={() => setSelectedTask(task)}
                                    >
                                       <Typography>
                                          {task.title === '' ? 'Untitled' : task.title}
                                       </Typography>
                                    </Card>
                                 )}
                              </Draggable>
                           ))}
                           {provided.placeholder}
                        </Box>
                     )}
                  </Droppable>
               ))}
            </Box>
         </DragDropContext>
         <TaskModal
            task={selectedTask}
            boardId={boardId}
            onClose={() => setSelectedTask(undefined)}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
         />
      </>
   );
}
