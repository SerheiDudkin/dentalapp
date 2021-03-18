import React, {useState} from 'react';
import {Input, Item, Label} from 'native-base';
import Button from '../components/Button';
import Container from '../components/Container';
import styled from 'styled-components';
import {appointmentsApi} from '../utils/api';
import {Layout} from '../components/Layout/Layout';
import {DateInput} from '../components/DateInput/DateInput';
import {TimeInput} from '../components/TimeInput/TimeInput';
import {useDispatch} from 'react-redux';
import {clientAppointmentsLoad} from '../client/store/client-action';

const emptyAppointment = {
  clientId: '',
  diagnosis: '',
  procedure: '',
  price: '',
  date: new Date(),
  time: new Date(),
};

const AddAppointmentScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const clientId = navigation.getParam('clientId');
  const [values, setValues] = useState({
    ...emptyAppointment,
    clientId,
  });
  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    appointmentsApi
      .add(values)
      .then(() => {
        navigation.navigate('Client', {id: clientId});
        dispatch(clientAppointmentsLoad(clientId));
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Layout navigation={navigation} justifyContent="center" scrollable={false}>
      <Container
        style={{
          flex: 1,
          justifyContent: 'center',
          maxHeight: 350,
        }}>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Процедура</Label>
          <Input
            onChange={handleChange.bind(this, 'procedure')}
            value={values.procedure}
            style={{marginTop: 20}}
          />
        </Item>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Диагноз</Label>
          <Input
            onChange={handleChange.bind(this, 'diagnosis')}
            value={values.diagnosis}
            style={{marginTop: 20}}
          />
        </Item>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Цена</Label>
          <Input
            onChange={handleChange.bind(this, 'price')}
            value={values.price}
            keyboardType="numeric"
            style={{marginTop: 20}}
          />
        </Item>
        <Item style={{marginTop: 20, marginLeft: 0}}>
          <TimeRow>
            <DateInput
              date={values.date}
              onChange={(date) => setValues({...values, date})}
            />
            <TimeInput
              time={values.time}
              onChange={(time) => setValues({...values, time})}
            />
          </TimeRow>
        </Item>
        <ButtonView>
          <Button onPress={onSubmit} color="#87CC6F" iconName="add">
            Добавить прием
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

const TimeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

AddAppointmentScreen.navigationOptions = {
  title: 'Добавить прием',
  headerTintColor: '#2A86ff',
  headerTransparent: true,
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};
export default AddAppointmentScreen;
