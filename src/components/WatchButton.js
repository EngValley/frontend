import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements"
import { firebase } from "../firebase/config"

export default function WatchButton(props) {
    const userRef = firebase.firestore().collection('users')
    const userId = firebase.auth().currentUser?.uid
    const [watched, setWatched] = useState(false)

    useEffect(() => {
        if (userId && props.target) {
            userRef
                .doc(userId)
                .get()
                .then((doc) => {
                    const docData = doc.data()
                    setWatched(docData.watching.includes(props.target))
                })

        }
    }, [userId, props.target])

    function watch() {
        if (!canWatch()) return;

        userRef
            .doc(userId)
            .get()
            .then((doc) => {
                const docData = doc.data()
                console.log(docData)
                if (docData.watching.includes(props.target)) {
                    alert('You are already watching this candidate.')
                    return;
                }

                userRef
                    .doc(userId)
                    .update({
                        'watching': firebase.firestore.FieldValue.arrayUnion(props.target)
                    })
                    .then(() => {
                        setWatched(true)
                    })
            })
    }

    function canWatch() {
        return props.target && userId && !watched
    }

    return <Button disabled={!canWatch()} onPress={watch} title={"Watch"}/>
}