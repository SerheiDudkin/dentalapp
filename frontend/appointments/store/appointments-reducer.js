import {appointmentsInitialState} from './appointments-initial-state';

export const appointmentsReducer = (
  state = appointmentsInitialState,
  action,
) => {
  switch (action.type) {
    case 'APPOINTMENTS_LOAD':
      return {
        ...state,
        isLoading: true,
        error: null,
        items: [],
      };
    case 'APPOINTMENTS_LOADED':
      return {
        ...state,
        isLoading: false,
        error: null,
        items: action.items,
      };
    case 'APPOINTMENTS_LOAD_FAILED':
      return {
        ...state,
        isLoading: false,
        error: action.error,
        items: [],
      };
    default:
      return state;
  }
};
