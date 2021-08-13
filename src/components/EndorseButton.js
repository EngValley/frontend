import React, { useState } from "react";
import { Linking } from "react-native";
import { Button } from "react-native-elements"
import { firebase } from "../firebase/config"

export default function EndorseButton(props) {
    const userRef = firebase.firestore().collection('users')
    const userId = firebase.auth().currentUser?.uid

    function endorse() {
        if (!canEndorse()) return;

        userRef
            .doc(props.target)
            .get()
            .then((doc) => {
                const docData = doc.data()
                console.log(docData)
                if (docData.endorsers.includes(userId)) {
                    alert('You have already endorsed this candidate.')
                    return null;
                }

                userRef
                    .doc(props.target)
                    .update({
                        'endorsers': firebase.firestore.FieldValue.arrayUnion(userId)
                    })
                    .then(() => {
                        const newEndorsers = [...props.endorsers]
                        newEndorsers.push(userId)
                        props.setEndorsers(newEndorsers)
                        alert('Endorsed!')
                    })
            })
    }

    function canEndorse() {
        return props.target && userId && props.endorsers && !props.endorsers.includes(userId)
    }

    return <Button disabled={!canEndorse()} onPress={endorse} title={"Endorse"}/>
}