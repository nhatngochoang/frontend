import { ListParams, Task } from 'models';
import axiosClient from './axiosClient';

const taskApi = {
   create(boardId: string, params: ListParams): Promise<Task> {
      const url = `boards/${boardId}/tasks`;
      return axiosClient.post(url, params);
   },

   update(boardId: string, taskId: string, params: ListParams): Promise<Task> {
      return axiosClient.put(`boards/${boardId}/tasks/${taskId}`, params);
   },
   updatePosition(boardId: string, params: ListParams): Promise<any> {
      return axiosClient.put(`boards/${boardId}/tasks/update-position`, params);
   },

   delete(boardId: string, taskId: string): Promise<any> {
      return axiosClient.delete(`boards/${boardId}/tasks/${taskId}`);
   },
};

export default taskApi;
