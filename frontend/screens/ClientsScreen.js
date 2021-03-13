import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {clientsApi} from '../utils/api';
import {ScrollView, TouchableOpacity} from 'react-native';
import PlusButton from '../components/PlusButton';
import {Layout} from '../components/Layout/Layout';

export const ClientsScreen = ({navigation}) => {
  const [clients, setClients] = useState([]);
  const [err, setErr] = useState();

  const fetchClients = () => {
    clientsApi
      .get()
      .then(({data: {data}}) => setClients(data))
      .catch((error) => {
        console.log(error);
        setErr(JSON.stringify(error));
      });
  };

  useEffect(fetchClients, []);

  return (
    <>
      <Layout navigation={navigation} plusRoute="AddClient">
        {err && <Text>{err}</Text>}
        {clients.map((client) => (
          <TouchableOpacity
            key={`client-id-${client._id}`}
            onPress={() => navigation.navigate('Client', {id: client._id})}>
            <View
              style={{
                margin: 5,
                backgroundColor: 'lightgray',
                borderRadius: 5,
                flex: 1,
                alignItems: 'flex-start',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <Text style={{fontSize: 20}}>{client.fullname}</Text>
              <Text style={{fontSize: 20}}>{client.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Layout>
    </>
  );
};
