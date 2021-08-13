import React, { useEffect, useState } from 'react'
import { Button, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Linking } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import strings from '../../res/strings'

export default function ProfileScreen({navigation}) {
    const [user, setUser] = useState({})
    const [oldUser, setOldUser] = useState({})

    const userRef = firebase.firestore().collection('users')
    const userId = firebase.auth().currentUser.uid

    const updateTextField = (fieldName) => {
        return (text) => {
            const newUser = {...user}
            newUser[fieldName] = text
            setUser(newUser)
        }
    }

    const saveChanges = () => {
        userRef
            .doc(userId)
            .set(user)
            .then(() => alert('Updated!'))
            .catch((error) => alert(error))
            .then(() => setOldUser({...user}))
    }

    const discardChanges = () => {
        setUser({...oldUser})
    }

    useEffect(() => {
        userRef
            .doc(userId)
            .get()
            .then( (doc) => {
                if (!doc.exists) {
                    alert('User not found in secondary DB.')
                }
                const retrievedUser = doc.data()
                setUser(retrievedUser)
                setOldUser({...retrievedUser})
             } )
            .catch( (error) => alert(error) )
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>
                    Full Name: <TextInput style={styles.fieldTextInput} value={user.fullName} onChangeText={updateTextField('fullName')} />
                </Text>
            </View>
            <View>
                <Text style={styles.fieldLabel}>Title: <TextInput style={styles.fieldTextInput} value={user.title} onChangeText={updateTextField('title')} />
                </Text>
            </View>
            <View>
                <Text>Know someone that might be a good fit? Consider <Text style={styles.inviteLink} onPress={() => Linking.openURL(encodeURI('mailto:?subject=' + strings.inviteSubject + '&body=' + strings.inviteBody))}>inviting them</Text></Text>
            </View>
            <View style={styles.profileButtonContainer}>
                <Button style={styles.profileButton} title="Save" onPress={saveChanges}/>
                <Button style={styles.profileButton} title="Discard" onPress={discardChanges}/>
                <Button style={styles.profileButton} title="Candidates" onPress={() => navigation.navigate("CandidateList")} />
                <Button style={styles.profileButton} title="Log Out" onPress={() => {
                    firebase.auth().signOut().then( () => navigation.navigate('Welcome'))
                }
                    } />
            </View>
        </View>
    )
}
