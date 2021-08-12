import React, { useEffect, useState } from 'react'
import { Button, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ContactButton } from '../../components';

export default function CandidateListScreen({props, navigation}) {
    const [users, setUsers] = useState([])

    const userRef = firebase.firestore().collection('users')

    useEffect(() => {
        userRef
            .get()
            .then(
                snapshot => {
                    const newUsers = []
                    snapshot.forEach(doc => {
                        const userData = doc.data()

                        const user = {
                            'fullName' : userData.fullName,
                            'title' : userData.title,
                            'id' : userData.id,
                            'email' : userData.email
                        }
                        newUsers.push(user)
                    });
                    setUsers(newUsers)
                    console.log('Found users: ', newUsers)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const renderUser = ({item, index}) => {
        return (
            <View style={styles.userContainer} key={item.fullName}>
                <Text style={styles.userText}>
                    {item.fullName}, {item.title}
                </Text>
                <Button title="View info" onPress={() => navigation.navigate("Info", { 'userId' : item.id })} />
                <ContactButton email={item.email}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            { users && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={users}
                        renderItem={renderUser}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}
