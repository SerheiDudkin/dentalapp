import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import styled from 'styled-components';
import GrayText from '../components/GrayText';
import Badge from '../components/Badge';
import {getAvatarColor} from '../utils/getAvatarColor';

const Appointment = ({navigate, item}) => {
  const {clientId: client, diagnosis, active, time} = item;
  const avatarColors = getAvatarColor(client.fullname.toUpperCase());
  return (
    <GroupItem onPress={() => navigate('Client', {id: client._id})}>
      <Avatar style={{backgroundColor: avatarColors.background}}>
        <Letter style={{color: avatarColors.color}}>
          {client.fullname[0].toUpperCase()}
        </Letter>
      </Avatar>
      <View style={{flex: 1}}>
        <FullName>{client.fullname}</FullName>
        <GrayText>{diagnosis}</GrayText>
      </View>
      <Badge active={active}>{time}</Badge>
    </GroupItem>
  );
};

Appointment.defaultProps = {
  groupTitle: 'Untitled',
  items: [],
};

const Letter = styled.Text`
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin-top: -1px;
`;
const FullName = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const Avatar = styled.Text`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin-right: 15px;
  text-align: center;
`;
const GroupItem = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: mintcream;
`;

export default Appointment;
