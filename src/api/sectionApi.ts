import { ListParams, Section } from 'models';
import axiosClient from './axiosClient';

const sectionApi = {
   create(boardId: string): Promise<Section> {
      const url = `boards/${boardId}/sections`;
      return axiosClient.post(url);
   },

   update(boardId: string, sectionId: string, params: ListParams): Promise<Section> {
      return axiosClient.put(`boards/${boardId}/sections/${sectionId}`, params);
   },

   delete(boardId: string, sectionId: string): Promise<any> {
      return axiosClient.delete(`boards/${boardId}/sections/${sectionId}`);
   },
};

export default sectionApi;
