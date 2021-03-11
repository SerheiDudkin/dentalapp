import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
import Button from '../components/Button';
import Container from '../components/Container';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {clientsApi} from '../utils/api';

const AddClientScreen = ({navigation}) => {
  const [values, setValues] = useState({});
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    clientsApi
      .add(values)
      .then(() => {
        navigation.navigate('Home');
        alert('Ok');
      })
      .catch(() => {
        alert('Bad');
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Container
        style={{
          flex: 1,
          justifyContent: 'center',
          maxHeight: 300,
        }}>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Имя и Фамилия</Label>
          <Input
            onChange={handleChange.bind(this, 'fullname')}
            value={values.fullname}
            // autoFocus
            style={{marginTop: 20}}
          />
        </Item>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Номер телефона</Label>
          <Input
            onChange={handleChange.bind(this, 'phone')}
            value={values.phone}
            keyboardType="numeric"
            dataDetectorTypes="phoneNumber"
            style={{marginTop: 20}}
            cliarButtonMode
          />
        </Item>
        <ButtonView>
          <Button onPress={onSubmit} color="#87CC6F" iconName="add">
            Добавить клиента
          </Button>
        </ButtonView>
      </Container>
    </View>
  );
};

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

AddClientScreen.navigationOptions = {
  title: 'Добавить Клиента',
  headerTintColor: '#2A86ff',
  headerTransparent: true,
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};
export default AddClientScreen;
