import React, { useEffect, useState } from 'react'
import { Button, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function ProfileScreen({navigation}) {
    const [user, setUser] = useState({})
    const [oldUser, setOldUser] = useState({})
    const [fieldInfos, setFieldInfos] = useState([])

    const candidateFieldRef = firebase.firestore().collection('candidateFields')

    const userRef = firebase.firestore().collection('users')
    const userID = firebase.auth().currentUser.uid

    const renderField = (field) => {
        return (
            <View key={field.name} style={styles.fieldContainer}>
                <Text style={styles.fieldLabel} >{field.displayName}</Text>
                <TextInput style={styles.fieldTextInput} value={user[field.name] || ''} onChangeText={(text) => {
                    const newUser = {...user}
                    newUser[field.name] = text
                    setUser(newUser)
                }}/>
            </View>
        )
    }

    const saveChanges = () => {
        userRef
            .doc(user.id)
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
            .doc(userID)
            .get()
            .then( (doc) => {
                const retrievedUser = doc.data()
                setUser(retrievedUser)
                setOldUser({...retrievedUser})
             } )
            .catch( (error) => alert(error) )

        candidateFieldRef
            .get()
            .then( (snapshot) => {console.log(snapshot.docs); setFieldInfos(snapshot.docs.map(doc => doc.data()))} )
            .catch( (error) => alert(error) )
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.fieldList}>
                {fieldInfos.map( (field, i) => renderField(field))}
            </View>
            <View style={styles.profileButtonContainer}>
                <Button style={styles.profileButton} title="Save" onPress={saveChanges}/>
                <Button style={styles.profileButton} title="Discard" onPress={discardChanges}/>
                <Button style={styles.profileButton} title="Candidates" onPress={() => navigation.navigate("CandidateList")} />
            </View>
        </View>
    )
}
