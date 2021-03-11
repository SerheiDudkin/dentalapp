import React, {useEffect, useState} from 'react';
import Appointment from '../components/Appointment';
import SectionTitle from '../components/SectionTitle';
import styled from 'styled-components';
import {SectionList} from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appointmentsApi} from '../utils/api';
import PlusButton from '../components/PlusButton';
import {alert} from 'react-native/Libraries/Alert/Alert';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = () => {
    setIsLoading(true);
    appointmentsApi
      .get()
      .then(({data}) => {
        // console.log(JSON.stringify(data.data));
        setData(data.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  useEffect(fetchAppointments, []);

  const removeAppointment = (id) => {
    alert(
      'Удаление приема',
      'Вы действительно хотите удалить прием?',
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            setIsLoading(true);
            appointmentsApi
              .remove(id)
              .then(() => {
                fetchAppointments();
              })
              .catch(() => {
                setIsLoading(false);
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item) => item._id}
          onRefresh={fetchAppointments}
          refreshing={isLoading}
          renderItem={({item}) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton style={{backgroundColor: '#B4C1CB'}}>
                  <AntDesign name="edit" size={40} color={'white'} />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={removeAppointment.bind(this, item._id)}
                  style={{backgroundColor: '#F85A5A'}}>
                  <Ionicons name="close" size={40} color={'white'} />
                </SwipeViewButton>,
              ]}>
              <Appointment navigate={navigation.navigate} item={item} />
            </Swipeable>
          )}
          renderSectionHeader={({section: {title}}) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}
      <PlusButton onPress={navigation.navigate.bind(this, 'AddClient')} />
    </Container>
  );
};

HomeScreen.navigationOptions = {
  title: 'Журнал клиентов',
  headerTintColor: '#2A86FF',
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

const SwipeView = styled.View``;

const SwipeViewButton = styled.TouchableOpacity`
  height: 100%;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;
export default HomeScreen;
