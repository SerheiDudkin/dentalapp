import axios from 'axios';
import {appConfig} from '../../appConfig';

export const axiosWrapper = {
  get: (url, config) => axios.get(`${appConfig.apiUrl}${url}`, config),
  post: (url, data, config) =>
    axios.post(`${appConfig.apiUrl}${url}`, data, config),
  delete: (url, config) => axios.delete(`${appConfig.apiUrl}${url}`, config),
};
