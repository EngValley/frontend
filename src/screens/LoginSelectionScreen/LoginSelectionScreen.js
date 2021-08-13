import React from 'react'
import { Text, View } from 'react-native'
import { Link } from '@react-navigation/native'
import { GoogleLoginButton, LinkedInLoginButton } from 'react-social-login-buttons'
import { firebase } from '../../firebase/config'
import * as Google from 'expo-auth-session/providers/google';
import { WEB_CLIENT_ID } from '@env'
import styles from './styles'
import { userTools } from '../../tools'

export default function LoginSelectionScreen( {navigation} ) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: WEB_CLIENT_ID,
        },
    );
    const usersRef = firebase.firestore().collection('users')

    const completeSignIn = (credential) => {
        firebase.auth().signInWithCredential(credential)
            .then(
                () => {
                    const currentUser = firebase.auth().currentUser
                    return userTools.addUserIfNew(currentUser.uid, {
                        fullName: currentUser.displayName,
                        email: currentUser.email
                    }, usersRef)
                }
            )
            .then((added) => {
                navigation.navigate('Profile')
                console.log('Done!')
            })
    }

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            console.log('Google Response: ', response)
            
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token)
            completeSignIn(credential)
            
        }
    }, [response]);

    async function linkedInLogin() {
        const provider = new firebase.auth.OAuthProvider('linkedin.com')
        
        firebase.auth().signInWithPopup(provider)
            .then((response) => {
                console.log(response)
                completeSignIn(response.credential)
            })
            .catch((error) => {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    alert('It looks like you signed in using a different provider. Please sign in using your original provider.')
                }
                else {
                    alert(error.message)
                }
            })
    }

    return (
        <View>
            <GoogleLoginButton onClick={promptAsync}/>
            <LinkedInLoginButton onClick={linkedInLogin}/>
            <Text>Or <Text style={styles.standardLink} onPress={() => navigation.navigate('EmailLogin')}>Use email</Text></Text>
        </View>
    )
}