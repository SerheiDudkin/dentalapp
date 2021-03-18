import {clientsInitialState} from './clients-initial-state';

export const clientsReducer = (state = clientsInitialState, action) => {
  switch (action.type) {
    case 'CLIENTS_LOADED':
      return {
        ...state,
        items: action.clients,
        error: null,
      };
    case 'CLIENTS_LOAD_FAILED':
      return {
        ...state,
        items: [],
        error: action.error,
        isLoading: true,
      };
    default:
      return state;
  }
};
