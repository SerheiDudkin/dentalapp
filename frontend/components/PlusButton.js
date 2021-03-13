import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

const PlusButton = ({onPress}) => (
  <Circle onPress={onPress}>
    <Icon name="add" size={40} color={'white'} />
  </Circle>
);

const Circle = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background: #2a86ff;
  position: absolute;
  right: 25px;
  bottom: 70px;
`;
export default PlusButton;
