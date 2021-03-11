import {axiosWrapper} from '../axios/axiosWrapper';

export const clientsApi = {
  get: () => axiosWrapper.get('/clients'),
  add: (values) => axiosWrapper.post('/clients', values),
  show: (id) => axiosWrapper.get('/clients/' + id),
};
