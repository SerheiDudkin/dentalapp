import {combineReducers} from 'redux';
import {clientsReducer} from '../clients/store/clients-reducer';

export const reducer = combineReducers({
  clients: clientsReducer,
});
