import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  HomeScreen,
  ClientScreen,
  AddClientScreen,
  AddAppointmentScreen,
} from './screens';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
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
    AddClient: {
      screen: AddClientScreen,
    },
    AddAppointment: {
      screen: AddAppointmentScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
