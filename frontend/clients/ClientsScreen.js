import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {clientsApi} from '../utils/api';
import {ScrollView, TouchableOpacity} from 'react-native';
import PlusButton from '../components/PlusButton';
import {Layout} from '../components/Layout/Layout';
import {connect, useDispatch} from 'react-redux';
import {clientsLoaded, clientsLoadFailed} from './store/clients-actions';

const ClientsScreenComponent = ({navigation, clients, error}) => {
  const dispatch = useDispatch();

  const fetchClients = () => {
    clientsApi
      .get()
      .then(({data: {data}}) => dispatch(clientsLoaded(data)))
      .catch((err) => {
        dispatch(clientsLoadFailed(JSON.stringify(err)));
      });
  };

  useEffect(fetchClients, []);

  return (
    <>
      <Layout navigation={navigation} plusRoute="AddClient" error={error}>
        {clients.map((client) => (
          <TouchableOpacity
            key={`client-id-${client._id}`}
            onPress={() => navigation.navigate('Client', {id: client._id})}>
            <View
              style={{
                margin: 5,
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
