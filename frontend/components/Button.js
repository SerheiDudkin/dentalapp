import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = ({children, color, onPress, style, iconName}) => (
  <ButtonWrapper onPress={onPress} color={color} style={style}>
    {iconName && (
      <Icon style={{marginRight: 10}} name={iconName} size={24} color="white" />
    )}
    {children && <ButtonText>{children}</ButtonText>}
  </ButtonWrapper>
);

Button.defaultProps = {
  color: '#2a86ff',
};

const ButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: ${(props) => props.color};
  text-align: center;
  height: 45px;
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 24px;
`;

export default Button;
