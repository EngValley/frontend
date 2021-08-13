import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ContactButton, EndorseButton } from '../../components';

export default function InfoScreen({route}) {
    const [user, setUser] = useState({})
    const [idNameMap, setIdNameMap] = useState({})
    const setEndorsers = (newEndorsers) => {
        const newUser = {...user}
        newUser.endorsers = newEndorsers
        setUser(newUser)
    }

    const userRef = firebase.firestore().collection('users')
    const userId = route.params.userId

    useEffect(() => {
        userRef
            .doc(userId)
            .get()
            .then( (doc) => setUser(doc.data()) )
            .catch( (error) => alert(error) )
        userRef
            .get()
            .then(
                snapshot => {
                    const newIdNameMap = {}
                    snapshot.forEach(doc => {
                        const userData = doc.data()
                        newIdNameMap[doc.id] = userData.fullName
                    });

                    setIdNameMap(newIdNameMap)
                },
                error => {
                    console.log(error)
                }
            )
            .catch( (error) => alert(error) )
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text>Full Name: {user.fullName}</Text>
                <Text>Title: {user.title}</Text>
                <Text>Endorsers: {user.endorsers?.length > 0 ? user.endorsers.map((endorserId, index) => idNameMap[endorserId]).join(', ') : 'None'} </Text>
            </View>
            <EndorseButton target={userId} endorsers={user.endorsers} setEndorsers={setEndorsers}/>
            <ContactButton email={user.email} />
        </View>
    )
}
