import {
  clientAppointmentsInitialState,
  clientInitialState,
} from './client-initial-state';

export const clientReducer = (state = clientInitialState, action) => {
  switch (action.type) {
    case 'CLIENT_LOAD':
      return {
        ...state,
        item: null,
        error: null,
        isLoading: true,
        appointments: clientAppointmentsInitialState,
      };
    case 'CLIENT_LOADED':
      return {
        ...state,
        item: action.client,
        error: null,
        isLoading: false,
        appointments: clientAppointmentsInitialState,
      };
    case 'CLIENT_LOAD_FAILED':
      return {
        ...state,
        item: null,
        error: action.error,
        isLoading: false,
        appointments: clientAppointmentsInitialState,
      };
    case 'CLIENT_APPOINTMENTS_LOAD':
      return {
        ...state,
        appointments: clientAppointmentsInitialState,
      };
    case 'CLIENT_APPOINTMENTS_LOADED':
      return {
        ...state,
        appointments: {
          items: action.appointments,
          isLoading: false,
          error: null,
        },
      };
    case 'CLIENT_APPOINTMENTS_LOAD_FAILED':
      return {
        ...state,
        appointments: {
          items: [],
          isLoading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
