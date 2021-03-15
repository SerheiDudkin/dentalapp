import {combineReducers} from 'redux';
import {clientsReducer} from '../clients/store/clients-reducer';
import {appointmentsReducer} from '../appointments/store/appointments-reducer';
import {clientReducer} from '../client/store/client-reducer';

export const reducer = combineReducers({
  client: clientReducer,
  clients: clientsReducer,
  appointments: appointmentsReducer,
});
