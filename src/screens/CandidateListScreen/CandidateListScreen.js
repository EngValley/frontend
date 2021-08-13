import React, { useEffect, useState } from 'react'
import { Button, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { CandidateCard, ContactButton } from '../../components';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

export default function CandidateListScreen({props, navigation}) {
    const [users, setUsers] = useState([])
    const [idNameMap, setIdNameMap] = useState({})

    const userRef = firebase.firestore().collection('users')

    useEffect(() => {
        userRef
            .get()
            .then(
                snapshot => {
                    const newUsers = []
                    const newIdNameMap = {}
                    snapshot.forEach(doc => {
                        const userData = doc.data()

                        const user = {
                            'fullName' : userData.fullName,
                            'title' : userData.title,
                            'id' : doc.id,
                            'email' : userData.email,
                            'approved' : userData.approved,
                            'endorsers' : userData.endorsers
                        }
                        newUsers.push(user)
                        newIdNameMap[doc.id] = userData.fullName
                    });

                    setUsers(newUsers)
                    setIdNameMap(newIdNameMap)
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
            <SearchBar />
            { users && (
                <View style={styles.listContainer}>
                    {users.map( (user, index) => <CandidateCard
                        fullName={user.fullName}
                        title={user.title}
                        email={user.email}
                        endorsers={user.endorsers}
                        idNameMap={idNameMap}
                        id={user.id}
                        approved={user.approved} 
                        key={user.id}
                        navigation={navigation}/>)}
                </View>
            )}
        </View>
    )
}
