import React, {useState} from 'react';
import {View} from 'react-native';
import {Input, Item, Label} from 'native-base';
import Button from '../components/Button';
import Container from '../components/Container';
import styled from 'styled-components';
import {appointmentsApi} from '../utils/api';
import DatePicker from 'react-native-datepicker';

const AddAppointmentScreen = ({navigation}) => {
  const [values, setValues] = useState({});
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
          maxHeight: 350,
        }}>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Процедура</Label>
          <Input
            onChange={handleChange.bind(this, 'dentNumber')}
            value={values.fullname}
            style={{marginTop: 20}}
          />
        </Item>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Диагноз</Label>
          <Input
            onChange={handleChange.bind(this, 'diagnosis')}
            value={values.phone}
            style={{marginTop: 20}}
          />
        </Item>
        <Item floatingLabel style={{flex: 1}}>
          <Label>Цена</Label>
          <Input
            onChange={handleChange.bind(this, 'price')}
            value={values.phone}
            keyboardType="numeric"
            style={{marginTop: 20}}
          />
        </Item>
        <Item style={{marginTop: 20, marginLeft: 0}}>
          <TimeRow>
            <View style={{flex: 1}}>
              <DatePicker
                date={new Date()}
                mode="date"
                placeholder="Дата"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Сохранить"
                cancelBtnText="Отмена"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                  },
                  dateText: {
                    fontSize: 20,
                  },
                }}
                onDateChange={(date) => {
                  this.setState({date: date});
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <DatePicker
                date={new Date()}
                mode="time"
                placeholder="Время"
                format="HH:mm"
                minDate={new Date()}
                confirmBtnText="Сохранить"
                cancelBtnText="Отмена"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                  },
                  dateText: {
                    fontSize: 20,
                  },
                }}
                onDateChange={(time) => {
                  this.setState({date: time});
                }}
              />
            </View>
          </TimeRow>
        </Item>
        <ButtonView>
          <Button onPress={onSubmit} color="#87CC6F" iconName="add">
            Добавить прием
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
