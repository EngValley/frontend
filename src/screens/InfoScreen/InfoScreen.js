import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { ContactButton, EndorseButton, QACard } from '../../components';
import { Button } from 'react-native';

export default function InfoScreen({route}) {
    const [user, setUser] = useState({})
    const [idNameMap, setIdNameMap] = useState({})
    const [showQAInterface, setShowQAInterface] = useState(false)
    const [questionText, setQuestionText] = useState('')

    const setEndorsers = (newEndorsers) => {
        const newUser = {...user}
        newUser.endorsers = newEndorsers
        setUser(newUser)
    }

    const submitQuestion = () => {
        const newQAPair = {
            question: questionText,
            answer: ''
        }
        userRef
            .doc(userId)
            .update({
                qaPairs: firebase.firestore.FieldValue.arrayUnion(newQAPair)
            })
            .then(() => {
                const newUser = {...user}
                newUser.qaPairs.push(newQAPair)
                setUser(newUser)
                setQuestionText('')
                setShowQAInterface(false)
            })
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
            { user?.qaPairs?.length > 0 ? (
                <View>
                    {user.qaPairs.map((qaPair, qaIndex) => <QACard key={qaIndex} question={qaPair.question} answer={qaPair.answer} />)}
                </View>
            ) : <></>}
            { showQAInterface ? (
                <View>
                    <TextInput style={styles.questionTextInput} value={questionText} onChangeText={setQuestionText} multiline={true} numberOfLines={100} />
                    <Button title={'Submit'} disabled={questionText.length == 0} onPress={submitQuestion} />
                </View>
            ) : <Button title={'Ask a question'} onPress={() => setShowQAInterface(true)} />}
            <EndorseButton target={userId} endorsers={user.endorsers} setEndorsers={setEndorsers}/>
            <ContactButton email={user.email} />
        </View>
    )
}
