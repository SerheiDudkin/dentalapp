import {appointmentsApi} from '../../utils/api';
import {clientAppointmentsLoad} from '../../client/store/client-actions';

export const appointmentAdd = (clientId, appointment, navigation) => (
  dispatch,
) => {
  appointmentsApi
    .add(appointment)
    .then(() => {
      dispatch(clientAppointmentsLoad(clientId));
      navigation.navigate('Client', {id: clientId});
    })
    .catch((err) => {
      alert(err);
    });
};
