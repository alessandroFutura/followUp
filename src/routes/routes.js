import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import preLoading from '../screens/preLoading';
import allowAccess from '../screens/allowDeviceAccess';
import WebView from '../screens/webViewApp';
import errorPage from '../screens/networkError';

const Stack = createStackNavigator();
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="preLoading"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="preLoading" 
        component={preLoading} 
      />
      <Stack.Screen 
        name="Login"
        component={Login}
      />
      <Stack.Screen 
        name="allowAccess" 
        component={allowAccess}
      />
      <Stack.Screen 
        name="WebView" 
        component={WebView} 
      />
      <Stack.Screen 
        name="errorPage" 
        component={errorPage} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#11552c"/>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </>
  );
}
