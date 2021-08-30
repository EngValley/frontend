import React, { useState } from "react";
import { ContactButton, EndorseButton, WatchButton } from ".";
import { Card, Button, Text } from 'react-native-elements'
import { View } from "react-native";
import { firebase } from "../firebase/config";

export default function CandidateCard( props ) {
    const [endorsers, setEndorsers] = useState(props.endorsers)
    const userId = firebase.auth().currentUser?.uid

    return (
        <Card>
            <Card.Title>{props.fullName + (props.title ? ', ' + props.title : '')}</Card.Title>
            { props.recommended ? <Text>Recommended for you</Text> : <></>}
            <Card.Divider/>
            <Text>{props.approved ? 'Approved' : 'Waiting for approval'}</Text>
            {endorsers && endorsers.length > 0 ? ( <Text>Endorsers: {endorsers.map((endorserId, index) => props.idNameMap[endorserId]).join(', ')}</Text> ): undefined}
            { props.id == userId ? 
                <Button title="Profile" onPress={() => props.navigation.navigate("Profile")} /> : (
                <View>
                    <ContactButton email={props.email}/>
                    <EndorseButton target={props.id} endorsers={endorsers} setEndorsers={setEndorsers}/>
                    <WatchButton target={props.id} />
                    <Button title="View info" onPress={() => props.navigation.navigate("Info", { 'userId' : props.id })} />
                </View>
                )
            }
        </Card>
    )
}