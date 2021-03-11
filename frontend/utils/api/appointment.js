import {axiosWrapper} from '../axios/axiosWrapper';

export default {
  get: () => axiosWrapper.get('/appointments'),
  remove: (id) => axiosWrapper.delete('/appointments/' + id),
  add: (values) => axiosWrapper.post('/appointments', values),
};
