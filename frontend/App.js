import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  AppointmentsScreen,
  ClientScreen,
  AddClientScreen,
  AddAppointmentScreen,
  ClientsScreen,
} from './screens';
import {Provider} from 'react-redux';
import {store} from './store/store';

const AppNavigator = createStackNavigator(
  {
    Appointments: {
      screen: AppointmentsScreen,
      navigationOptions: {
        title: 'Журнал клиентов',
        headerTintColor: '#2A86ff',
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
        cardOverlayEnabled: false,
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
