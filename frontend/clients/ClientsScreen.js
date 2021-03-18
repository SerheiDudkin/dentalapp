import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Layout} from '../components/Layout/Layout';
import {connect, useDispatch} from 'react-redux';
import {clientsLoad} from './store/clients-actions';

const ClientsScreenComponent = ({navigation, clients, error}) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(clientsLoad()), [dispatch]);

  return (
    <>
      <Layout navigation={navigation} plusRoute="AddClient" error={error}>
        {clients.map((client) => (
          <TouchableOpacity
            key={`client-id-${client._id}`}
            onPress={() => navigation.navigate('Client', {id: client._id})}>
            <View
              style={{
                margin: 1,
                backgroundColor: 'lightblue',
                borderRadius: 5,
                flex: 1,
                alignItems: 'flex-start',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <Text style={{fontSize: 20, color: 'blue'}}>
                {client.fullname}
              </Text>
              <Text style={{fontSize: 20}}>{client.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Layout>
    </>
  );
};
const mapStateToProps = ({clients}) => ({
  clients: clients.items,
  error: clients.error,
});
export const ClientsScreen = connect(mapStateToProps)(ClientsScreenComponent);
