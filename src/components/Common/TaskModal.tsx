import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {
   Backdrop,
   Box,
   Divider,
   Fade,
   IconButton,
   Modal,
   TextField,
   Typography,
} from '@mui/material';
import taskApi from 'api/taskApi';
import 'assets/css/custom-editor.css';
import { Task } from 'models';
import Moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';

type TaskModalProps = {
   task?: Task;
   boardId?: string;
   onClose?: () => void;
   onUpdate?: (task: Task) => void;
   onDelete?: (task: Task) => void;
};

const modalStyle = {
   outline: 'none',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '50%',
   bgcolor: 'background.paper',
   border: '0px solid #000',
   boxShadow: 24,
   p: 1,
   height: '80%',
};

let timer: any;
const timeout = 500;
let isModalClosed = false;

export default function TaskModal(props: TaskModalProps) {
   const { boardId } = props;
   const [task, setTask] = useState(props.task);
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const editorWrapperRef = useRef(null as HTMLElement | null);

   const onClose = () => {
      isModalClosed = true;
      if (props.onUpdate && props.onClose) {
         if (task) {
            props.onUpdate(task);
         }
         props.onClose();
      }
   };

   const deleteTask = async () => {
      try {
         if (!boardId || !task) return;
         await taskApi.delete(boardId, task.id);
         if (props.onDelete) props.onDelete(task);
         setTask(undefined);
      } catch (err) {
         alert(err);
      }
   };

   const updateTitle = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      clearTimeout(timer);
      const newTitle = e.target.value;
      timer = setTimeout(async () => {
         try {
            if (!boardId || !task) return;
            await taskApi.update(boardId, task.id, { title: newTitle });
         } catch (err) {
            alert(err);
         }
      }, timeout);

      if (task) task.title = newTitle;
      setTitle(newTitle);
      if (props.onUpdate && task) props.onUpdate(task);
   };

   const updateContent = async (event: any, editor: any) => {
      clearTimeout(timer);
      const data = editor.getData();

      console.log({ isModalClosed });

      if (!isModalClosed) {
         timer = setTimeout(async () => {
            try {
               if (!boardId || !task) return;
               await taskApi.update(boardId, task.id, { content: data });
            } catch (err) {
               alert(err);
            }
         }, timeout);

         if (task) task.content = data;
         setContent(data);
         if (props.onUpdate && task) props.onUpdate(task);
      }
   };

   const updateEditorHeight = useMemo(() => {
      return () => {
         setTimeout(() => {
            if (editorWrapperRef.current) {
               const box = editorWrapperRef?.current as any;
               box.querySelector('.ck-editor__editable_inline').style.height =
                  box.offsetHeight - 50 + 'px';
            }
         }, timeout);
      };
   }, []);

   useEffect(() => {
      setTask(props.task);
      setTitle(props.task !== undefined ? props.task.title : '');
      setContent(props.task !== undefined ? props.task.content : '');

      if (props.task !== undefined) {
         isModalClosed = false;

         updateEditorHeight();
      }
   }, [props.task, updateEditorHeight]);

   return (
      <>
         <Modal
            open={task !== undefined}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
         >
            <Fade in={task !== undefined}>
               <Box sx={modalStyle}>
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%',
                     }}
                  >
                     <IconButton color="error" onClick={deleteTask}>
                        <DeleteOutlinedIcon />
                     </IconButton>
                  </Box>
                  <Box
                     sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '2rem 5rem 5rem',
                     }}
                  >
                     <TextField
                        value={title}
                        onChange={updateTitle}
                        placeholder="Untitled"
                        variant="outlined"
                        fullWidth
                        sx={{
                           width: '100%',
                           '& .MuiOutlinedInput-input': { padding: 0 },
                           '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                           '& .MuiOutlinedInput-root': { fontSize: '2.5rem', fontWeight: '700' },
                           marginBottom: '10px',
                        }}
                     />
                     <Typography variant="body2" fontWeight="700">
                        {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''}
                     </Typography>
                     <Divider sx={{ margin: '1.5rem 0' }} />
                     <Box
                        ref={editorWrapperRef}
                        sx={{
                           position: 'relative',
                           height: '80%',
                           overflowX: 'hidden',
                           overflowY: 'auto',
                        }}
                     >
                        <CKEditor
                           editor={ClassicEditor}
                           data={content}
                           onChange={updateContent}
                           onFocus={updateEditorHeight}
                           onBlur={updateEditorHeight}
                        />
                     </Box>
                  </Box>
               </Box>
            </Fade>
         </Modal>
      </>
   );
}
