import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import {store} from './store/store';
import AppointmentsScreen from './appointments/AppointmentsScreen';
import ClientScreen from './client/ClientScreen';
import {ClientsScreen} from './clients/ClientsScreen';
import AddAppointmentScreen from './appointment/AddAppointmentScreen';
import AddClientScreen from './client/AddClientScreen';

const AppNavigator = createStackNavigator(
  {
    Appointments: {
      screen: AppointmentsScreen,
      navigationOptions: {
        title: 'Журнал приемов',
        headerTintColor: 'blue',
        headerTransparent: false,
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
          backgroundColor: '#F2F2F2',
        },
      },
    },
    Client: {
      screen: ClientScreen,
    },
    Clients: {
      screen: ClientsScreen,
      navigationOptions: {
        title: 'Клиенты',
        headerTintColor: 'blue',
        headerTransparent: false,
        headerStyle: {
          elevation: 0.8,
          shadowOpacity: 0.8,
          backgroundColor: '#F2F2F2',
          cardOverlayEnabled: false,
        },
      },
    },
    AddAppointment: {
      screen: AddAppointmentScreen,
    },
    AddClient: {
      screen: AddClientScreen,
    },
  },
  {
    initialRouteName: 'Clients',
  },
);

export const AppContainer = createAppContainer(AppNavigator);
export const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
