import { Board, ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';

const boardApi = {
   getOne(id: string): Promise<Board> {
      return axiosClient.get(`boards/${id}`);
   },
   getAll(): Promise<ListResponse<Board>> {
      const url = 'boards';
      return axiosClient.get(url);
   },
   getFavourites(): Promise<ListResponse<Board>> {
      const url = 'boards/favourites';
      return axiosClient.get(url);
   },

   create(): Promise<Board> {
      const url = 'boards';
      return axiosClient.post(url);
   },

   updatePosition: (params: ListParams) => axiosClient.put('boards', params),
   updateFavouritePosition: (params: ListParams) => axiosClient.put('boards/favourites', params),

   update(id: string, params: ListParams): Promise<Board> {
      return axiosClient.put(`boards/${id}`, params);
   },

   delete(id: string): Promise<any> {
      const url = `boards/${id}`;
      return axiosClient.delete(url);
   },
};

export default boardApi;
