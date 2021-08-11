import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {

    const [userText, setUserText] = useState('')
    const [users, setUsers] = useState([])

    const userRef = firebase.firestore().collection('users')
    const userID = props.extraData.id

    useEffect(() => {
        userRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newUsers = []
                    querySnapshot.forEach(doc => {
                        const user = doc.data()
                        user.id = doc.id
                        newUsers.push(user)
                    });
                    setUsers(newUsers)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const renderUser = ({item, index}) => {
        return (
            <View style={styles.userContainer}>
                <Text style={styles.userText}>
                    {index}. {item.text}
                </Text>
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
