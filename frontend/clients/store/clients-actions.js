import {clientsApi} from '../../utils/api';
export const clientsLoadAction = () => ({
  type: 'CLIENTS_LOAD_ACTION',
});
export const clientsLoad = () => (dispatch) => {
  dispatch(clientsLoadAction);
  clientsApi
    .get()
    .then(({data: {data}}) => dispatch(clientsLoaded(data)))
    .catch((err) => {
      dispatch(clientsLoadFailed(JSON.stringify(err)));
    });
};

export const clientsLoaded = (clients) => ({
  type: 'CLIENTS_LOADED',
  clients,
});
export const clientsLoadFailed = (error) => ({
  type: 'CLIENTS_LOAD_FAILED',
  error,
});
