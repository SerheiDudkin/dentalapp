import React, {useEffect} from 'react';
import {ActivityIndicator, Linking, Text} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Badge, Button, Container, GrayText} from '../components';
import {Layout} from '../components/Layout/Layout';
import {connect, useDispatch} from 'react-redux';
import {clientAppointmentsLoad, clientLoad} from './store/client-action';

const ClientScreenComponent = ({
  navigation,
  client,
  error,
  isLoading,
  appointmentsState,
}) => {
  const dispatch = useDispatch();
  const clientId = navigation.getParam('id');
  useEffect(() => {
    dispatch(clientLoad(clientId));
    dispatch(clientAppointmentsLoad(clientId));
  }, [dispatch, clientId]);

  return (
    <Layout
      navigation={navigation}
      plusRoute="AddAppointment"
      plusParams={{clientId}}
      error={error}>
      {isLoading ? (
        <ActivityIndicator size="large" color="2A86FF" />
      ) : (
        <>
          <ClientDetails>
            <ClientFullName>{client.fullname}</ClientFullName>
            <GrayText>{client.phone}</GrayText>

            <ClientButtons>
              <FormulaButtonView>
                <Button>Протокол приема</Button>
              </FormulaButtonView>
              <PhoneButtonView>
                <Button
                  onPress={() => Linking.openURL('tel:' + client.phone)}
                  color="#84D269">
                  <Icon name="call" size={22} color={'white'} />
                </Button>
              </PhoneButtonView>
            </ClientButtons>
          </ClientDetails>

          <ClientAppointments>
            {appointmentsState.error && (
              <Text>Ошибка {appointmentsState.error}</Text>
            )}
            {appointmentsState.isLoading ? (
              <ActivityIndicator size="large" color="2A86FF" />
            ) : (
              <Container>
                {appointmentsState.items.map((appointment) => (
                  <AppointmentCard key={appointment._id}>
                    <MoreButton>
                      <FontAwesome5
                        name="bars"
                        size={24}
                        color="rgba(0, 0, 0, 0.4)"
                      />
                    </MoreButton>
                    <AppointmentCardRow>
                      <FontAwesome5
                        name="pump-medical"
                        size={22}
                        color={'#A3A3A3'}
                      />
                      <AppointmentCardLabel>
                        <Text style={{fontWeight: '600'}}>
                          {appointment.diagnosis}
                        </Text>
                      </AppointmentCardLabel>
                    </AppointmentCardRow>
                    <AppointmentCardRow>
                      <FontAwesome5
                        name="briefcase-medical"
                        size={22}
                        color={'#A3A3A3'}
                      />
                      <AppointmentCardLabel>
                        <Text style={{fontWeight: '600'}}>
                          {appointment.diagnosis}
                        </Text>
                      </AppointmentCardLabel>
                    </AppointmentCardRow>
                    <AppointmentCardRow
                      style={{marginTop: 15, justifyContent: 'space-between'}}>
                      <Badge style={{width: 155}} active>
                        {appointment.date} - {appointment.time}
                      </Badge>
                      <Badge color="green">{appointment.price}</Badge>
                    </AppointmentCardRow>
                  </AppointmentCard>
                ))}
              </Container>
            )}
          </ClientAppointments>
        </>
      )}
    </Layout>
  );
};

const mapStateToProps = ({client}) => ({
  client: client.item,
  error: client.error,
  isLoading: client.isLoading,
  appointmentsState: client.appointments,
});

export const ClientScreen = connect(mapStateToProps)(ClientScreenComponent);

const MoreButton = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
`;

const AppointmentCardLabel = styled.Text`
  font-size: 22px;
  margin-left: 10px;
`;

const AppointmentCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 6.5px;
`;

const AppointmentCard = styled.View`
  padding: 20px 25px;
  border-radius: 10px;
`;

const ClientDetails = styled(Container)`
  flex: 0.3;
`;

const ClientAppointments = styled.View`
  flex: 1;
  background: #f8fafd;
`;

const FormulaButtonView = styled.View`
  flex: 1;
`;
const PhoneButtonView = styled.View`
  margin-left: 18px;
  flex: 0.28;
  width: 40px;
`;

const ClientButtons = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
`;

const ClientFullName = styled.Text`
  font-weight: 800;
  font-size: 30px;
  line-height: 30px;
  margin-bottom: 5px;
`;

ClientScreen.navigationOptions = {
  title: 'Карта Клиента',
  headerTintColor: '#2A86ff',
  headerTransparent: true,
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};
export default ClientScreen;
