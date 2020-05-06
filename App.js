import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientHome from './pages/clientHome.js';
import AdminHome from './pages/adminHome';
import ClientResources from './pages/clientResources.js';
import ClientServices from './pages/clientServices.js';
import AdminAddForm from './pages/adminAddForm.js';
import Login from './pages/login.js';
import Feedback from './pages/feedback.js';
import AdminFeedback from './pages/adminFeedback.js';

const Stack = createStackNavigator();


export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="ClientHome"
              component={ClientHome}
              // options={{ title: 'Welcome' }}
            />
            <Stack.Screen
              name="AdminHome"
              component={AdminHome}
            />
            <Stack.Screen
              name="ClientResources"
              component={ClientResources}
              // initialParams={isAdmin=false}
            />
            <Stack.Screen
              name="ClientServices"
              component={ClientServices}
              // initialParams={isAdmin=false}
            />
            <Stack.Screen
              name="AdminAddForm"
              component={AdminAddForm}
            />
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen 
              name="Feedback"
              component={Feedback}
            />
            <Stack.Screen 
              name="AdminFeedback"
              component={AdminFeedback}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
