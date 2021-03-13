import {axiosWrapper} from '../axios/axiosWrapper';

export default {
  get: () => axiosWrapper.get('/appointments'),
  show: (id) => axiosWrapper.get(`/appointments/${id}`),
  remove: (id) => axiosWrapper.delete(`/appointments/${id}`),
  add: (values) => axiosWrapper.post('/appointments', values),
};
