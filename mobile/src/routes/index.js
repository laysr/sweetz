import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '~/pages/Main/Home';
import Calculadora from '../pages/Main/Calculadora';
import Conversor from '../pages/Main/Conversor';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => (
  <Tab.Navigator
    initialRouteName="Calculadora"
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Calculadora':
            iconName = 'calculate';
            break;
          case 'Conversor':
            iconName = 'assessment';
            break;
          default:
            iconName = 'error';
            break;
        }

        return <Icon name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#9C27B0',
      inactiveTintColor: '#777',
    }}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Calculadora" component={Calculadora} />
    <Tab.Screen name="Conversor" component={Conversor} />
  </Tab.Navigator>
);

function TabBar({navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Icon name="home" />
    </View>
  );
}

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Routes;
