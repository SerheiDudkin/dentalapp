import {appointmentsApi} from '../../utils/api';

export const appointmentsLoadAction = () => ({
  type: 'APPOINTMENTS_LOAD',
});

export const appointmentsLoad = () => (dispatch) => {
  dispatch(appointmentsLoadAction());
  appointmentsApi
    .get()
    .then(({data: {data}}) => {
      dispatch(appointmentsLoaded(data));
    })
    .catch((err) => {
      dispatch(appointmentsLoadFailed(err));
    });
};

export const appointmentsLoaded = (items) => ({
  type: 'APPOINTMENTS_LOADED',
  items,
});

export const appointmentsLoadFailed = (error) => ({
  type: 'APPOINTMENTS_LOAD_FAILED',
  error,
});

export const appointmentRemove = (id) => (dispatch) => {
  appointmentsApi.remove(id).then(dispatch(appointmentsLoad()));
};
