import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Appointment from '../components/Appointment';
import styled from 'styled-components';
import Swipeable from 'react-native-swipeable-row';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {alert} from 'react-native/Libraries/Alert/Alert';
import {Layout} from '../components/Layout/Layout';
import {connect, useDispatch} from 'react-redux';
import {
  appointmentRemove,
  appointmentsLoad,
} from './store/appointments-actions';

const AppointmentsScreenComponent = ({
  navigation,
  appointments,
  error,
  isLoading,
}) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(appointmentsLoad()), [dispatch]);

  const removeAppointment = (id) => {
    alert(
      'Удаление приема',
      'Вы действительно хотите удалить прием?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            dispatch(appointmentRemove(id));
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Layout navigation={navigation} isLoading={isLoading} error={error}>
      {appointments.length > 0 &&
        appointments.map((appointment) => (
          <Swipeable
            rightButtons={[
              // <SwipeViewButton style={{backgroundColor: '#B4C1CB'}}>
              //   <AntDesign name="edit" size={40} color={'white'} />
              // </SwipeViewButton>,
              <SwipeViewButton
                onPress={removeAppointment.bind(this, appointment._id)}
                style={{backgroundColor: '#F85A5A'}}>
                <Ionicons name="close" size={40} color={'white'} />
              </SwipeViewButton>,
            ]}>
            <Appointment navigate={navigation.navigate} item={appointment} />
          </Swipeable>
        ))}
      {appointments.length === 0 && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Pull to refresh</Text>
        </View>
      )}
    </Layout>
  );
};

const mapStateToProps = ({appointments}) => ({
  appointments: appointments.items,
  error: appointments.error,
  isLoading: appointments.isLoading,
});
export const AppointmentsScreen = connect(mapStateToProps)(
  AppointmentsScreenComponent,
);

AppointmentsScreen.navigationOptions = {
  title: 'Журнал приемов',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

const SwipeView = styled.View``;

const SwipeViewButton = styled.TouchableOpacity`
  height: 100%;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;
export default AppointmentsScreen;
