import { Student, ListResponse, ListParams } from '../models';
import axiosClient from './axiosClient';

const authApi = {
   signup(params: ListParams): Promise<any> {
      const url = 'auth/signup';
      return axiosClient.post(url, params);
   },
   login(params: ListParams): Promise<any> {
      const url = 'auth/login';
      return axiosClient.post(url, params);
   },
   verifyToken(): Promise<any> {
      const url = 'auth/verify-token';
      return axiosClient.post(url);
   },

   getAll(params: ListParams): Promise<ListResponse<Student>> {
      const url = './students';
      return axiosClient.get(url, { params });
   },

   getById(id: string): Promise<Student> {
      const url = `/students/${id}`;
      return axiosClient.get(url);
   },

   add(data: Student): Promise<Student> {
      const url = './students';
      return axiosClient.post(url, data);
   },

   update(data: Partial<Student>): Promise<Student> {
      const url = `/students/${data.id}`;
      return axiosClient.patch(url, data);
   },

   remove(id: string): Promise<any> {
      const url = `/students/${id}`;
      return axiosClient.delete(url);
   },
};

export default authApi;
