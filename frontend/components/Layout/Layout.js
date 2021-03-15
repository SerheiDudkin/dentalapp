import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {LayoutStyles} from './LayoutStyles';
import {BottomMenu} from '../BottomMenu/BottomMenu';
import {ScrollView} from 'react-native-gesture-handler';
import PlusButton from '../PlusButton';

export const Layout = ({
  navigation,
  children,
  justifyContent = 'flex-start',
  plusRoute,
  plusParams,
  scrollable = true,
  isLoading = false,
  error = null,
}) => {
  const Container = scrollable ? ScrollView : View;
  return (
    <View style={[LayoutStyles.root, {justifyContent}]}>
      {error && <Text>Ошибка: {JSON.stringify(error)}</Text>}
      {isLoading === true && <ActivityIndicator />}
      {isLoading === false && (
        <Container style={LayoutStyles.container}>{children}</Container>
      )}
      {plusRoute && (
        <PlusButton
          onPress={() => navigation.navigate(plusRoute, plusParams)}
        />
      )}
      <BottomMenu navigation={navigation} />
    </View>
  );
};
