import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { logoutUser } from '../util/firebase';
import LocationList from '../screens/LocationList';
import Main from '../screens/Main';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'My Location',
            headerStyle: {
              backgroundColor: '#fea440',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="LocationList"
          component={LocationList}
          options={{
            title: 'List of Locations',
            headerStyle: {
              backgroundColor: '#fea440',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;