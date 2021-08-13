import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { CandidateListScreen, EmailLoginScreen, HomeScreen, ProfileScreen, EmailRegistrationScreen, WelcomeScreen, InfoScreen, LoginSelectionScreen } from './src/screens'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {decode, encode} from 'base-64'
import * as WebBrowser from 'expo-web-browser';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

// Completes Google authentication after redirect
WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name="Profile" component={ProfileScreen}/>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="LoginSelection" component={LoginSelectionScreen} options={{'title': 'Login'}}/>
              <Stack.Screen name="EmailLogin" component={EmailLoginScreen} options={{'title': 'Email Login'}}/>
              <Stack.Screen name="EmailRegistration" component={EmailRegistrationScreen} options={{'title': 'Email Registration'}}/>
            </>
          )}
          <Stack.Screen name="CandidateList" component={CandidateListScreen} options={{'title' : 'Candidates'}} />
          <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}
