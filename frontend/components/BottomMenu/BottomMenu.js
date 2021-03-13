import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BottomMenuStyles} from './BottomMenuStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const iconColor = '#333533';
export const BottomMenu = ({navigation}) => (
  <View style={BottomMenuStyles.root}>
    <MenuButton navigation={navigation} route="Clients" iconName="body" />
    <MenuButton navigation={navigation} route="Appointments" iconName="time" />
  </View>
);

const MenuButton = ({navigation, route, iconName}) => (
  <TouchableOpacity
    style={BottomMenuStyles.touchable}
    onPress={() => navigation.navigate(route)}>
    <View style={BottomMenuStyles.button}>
      <Icon name={iconName} size={24} color={iconColor} />
    </View>
  </TouchableOpacity>
);
