import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '~/pages/Main';
import Calculadora from './pages/Main/Calculadora';

const Stack = createStackNavigator();

const Routes = () => (
  <Stack.Navigator initialRouteName="Calculadora">
    <Stack.Screen name="Home" component={Main} />
    <Stack.Screen name="Calculadora" component={Calculadora} />
  </Stack.Navigator>
);

export default Routes;
