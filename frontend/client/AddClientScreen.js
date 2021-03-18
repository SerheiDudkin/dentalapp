import React, {useState} from 'react';
import {Input, Item, Label} from 'native-base';
import Button from '../components/Button';
import Container from '../components/Container';
import styled from 'styled-components';
import {Layout} from '../components/Layout/Layout';
import {useDispatch} from 'react-redux';
import {clientAdd} from './store/client-actions';

const AddClientScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    dispatch(clientAdd(values, navigation));
  };

  return (
    <Layout navigation={navigation} justifyContent="center" scrollable={false}>
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
    </Layout>
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
