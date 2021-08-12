import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ContactButton } from '../../components';

export default function InfoScreen({route}) {
    const [user, setUser] = useState({})
    const [fields, setFields] = useState([])

    const candidateFieldRef = firebase.firestore().collection('candidateFields')

    const userRef = firebase.firestore().collection('users')
    const userId = route.params.userId

    const renderField = (field, data) => {
        console.log("Data: ", data)
        return (
            <View key={field.name}>
                <Text>{field.displayName}</Text>
                <Text>{data || ''}</Text>
            </View>
        )
    }

    useEffect(() => {
        userRef
            .doc(userId)
            .get()
            .then( (doc) => setUser(doc.data()) )
            .catch( (error) => alert(error) )

        candidateFieldRef
            .get()
            .then( (snapshot) => {console.log(snapshot.docs); setFields(snapshot.docs.map(doc => doc.data()))} )
            .catch( (error) => alert(error) )
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {fields.map( (field, i) => renderField(field, user[field.name]))}
            </View>
            <ContactButton email={user.email} />
        </View>
    )
}
