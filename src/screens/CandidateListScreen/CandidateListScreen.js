import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { CandidateCard } from '../../components';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

export default function CandidateListScreen({props, navigation}) {
    const userId = firebase.auth().currentUser?.uid

    const [users, setUsers] = useState([])
    const [recommendations, setRecommendations] = useState([])
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

                        if (doc.id == userId) {
                            console.log('Setting recommendations')
                            setRecommendations(userData.recommendations)
                        }
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

    const getSortedUsers = () => {
        const sortedUsers = [...users];
        sortedUsers.sort((u1, u2) => recommendations.includes(u2.id) - recommendations.includes(u1.id));
        return sortedUsers;
    }

    return (
        <View style={styles.container}>
            <SearchBar />
            { users && (
                <View style={styles.listContainer}>
                    {getSortedUsers().map( (user, index) => <CandidateCard
                        fullName={user.fullName}
                        title={user.title}
                        email={user.email}
                        endorsers={user.endorsers}
                        idNameMap={idNameMap}
                        id={user.id}
                        approved={user.approved} 
                        key={user.id}
                        navigation={navigation}
                        recommended={recommendations.includes(user.id)}
                        />)}
                </View>
            )}
        </View>
    )
}
