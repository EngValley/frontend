import React from 'react'
import { Text, View } from 'react-native'
import { Link } from '@react-navigation/native'
import { GoogleLoginButton, LinkedInLoginButton } from 'react-social-login-buttons'
import { firebase } from '../../firebase/config'
import * as Google from 'expo-auth-session/providers/google';
import { WEB_CLIENT_ID } from '@env'
import styles from './styles'

export default function LoginSelectionScreen( {navigation} ) {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: WEB_CLIENT_ID,
        },
    );


    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            firebase.auth().signInWithCredential(credential);
        }
    }, [response]);

    async function googleLogin() {
        // TODO: Move to a better location
        GoogleSignin.configure({
            webClientId: '',
          });
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        firebase.auth().signInWithCredential(googleCredential);
    }

    const linkedInLogin = () => {

    }

    return (
        <View>
            <GoogleLoginButton onClick={promptAsync}/>
            <LinkedInLoginButton />
            <Text>Or <Text style={styles.standardLink} onPress={() => navigation.navigate('EmailLogin')}>Use email</Text></Text>
        </View>
    )
}