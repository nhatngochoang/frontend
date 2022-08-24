import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

const baseUrl = 'https://kanban-api-3000.herokuapp.com/api/v1/';

const getToken = () => {
   return localStorage.getItem('token');
};

const axiosClient = axios.create({
   baseURL: baseUrl,
   headers: {
      'Content-Type': 'application/json',
   },
   paramsSerializer: (params) => {
      return queryString.stringify(params);
   },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
   function (config: AxiosRequestConfig) {
      // Do something before request is sent
      return {
         ...config,
         headers: {
            authorization: `Bearer ${getToken()}`,
         },
      };
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
   function (response: AxiosResponse) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      if (response && response.data) return response.data;
      return response; // take data only
   },
   function (err) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (!err.response) {
         return alert(err);
      }
      throw err.response;
   }
);

export default axiosClient;
