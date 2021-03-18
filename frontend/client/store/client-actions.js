import {appointmentsApi, clientsApi} from '../../utils/api';
import {clientsLoad} from '../../clients/store/clients-actions';

export const clientLoadAction = (id) => ({
  type: 'CLIENT_LOAD',
  id,
});

export const clientLoad = (id) => (dispatch) => {
  dispatch(clientLoadAction(id));
  clientsApi
    .show(id)
    .then(({data: {data}}) => {
      dispatch(clientLoaded(data));
    })
    .catch((err) => {
      dispatch(clientLoadFailed(JSON.stringify(err)));
    });
};

export const clientLoaded = (client) => ({
  type: 'CLIENT_LOADED',
  client,
});

export const clientLoadFailed = (error) => ({
  type: 'CLIENT_LOAD_FAILED',
  error,
});

export const clientAppointmentsLoadAction = (clientId) => ({
  type: 'CLIENT_APPOINTMENTS_LOAD',
  clientId,
});

export const clientAppointmentsLoad = (clientId) => (dispatch) => {
  dispatch(clientAppointmentsLoadAction(clientId));
  appointmentsApi
    .show(clientId)
    .then(({data: {data: appointments}}) =>
      dispatch(clientAppointmentsLoaded(appointments)),
    )
    .catch((err) => dispatch(clientAppointmentsLoadFailed(err)));
};

export const clientAppointmentsLoaded = (appointments) => ({
  type: 'CLIENT_APPOINTMENTS_LOADED',
  appointments,
});

export const clientAppointmentsLoadFailed = (error) => ({
  type: 'CLIENT_APPOINTMENTS_LOAD_FAILED',
  error,
});

export const clientAdd = (client, navigation) => (dispatch) => {
  clientsApi
    .add(client)
    .then(
      ({
        data: {
          data: {_id: id},
        },
      }) => {
        dispatch(clientsLoad());
        navigation.navigate('Client', {id});
        alert('Ok');
      },
    )
    .catch(() => {
      alert('Bad');
    });
};
