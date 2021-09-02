import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { CandidateListScreen, EmailLoginScreen, ProfileScreen, EmailRegistrationScreen, SelfAssessmentScreen, WelcomeScreen, InfoScreen, LoginSelectionScreen } from './src/screens'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {decode, encode} from 'base-64'
import * as WebBrowser from 'expo-web-browser';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

// Completes Google authentication after redirect
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
      setLoggedIn(firebase.auth().currentUser)
  })

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          
          <Stack.Screen name="Profile" component={ProfileScreen}/>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} options={{'title': 'Login'}} setLoggedIn={setLoggedIn}/>
          <Stack.Screen name="EmailLogin" component={EmailLoginScreen} options={{'title': 'Email Login'}}/>
          <Stack.Screen name="EmailRegistration" component={EmailRegistrationScreen} options={{'title': 'Email Registration'}}/>
            
          <Stack.Screen name="CandidateList" component={CandidateListScreen} options={{'title' : 'Candidates'}} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="SelfAssessment" component={SelfAssessmentScreen} options={{'title' : 'Skills'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
