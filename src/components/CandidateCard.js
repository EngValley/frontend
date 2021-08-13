import React, { useState } from "react";
import { Linking } from "react-native";
import { ContactButton } from ".";
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements'
import EndorseButton from "./EndorseButton";

export default function CandidateCard( props ) {
    const [endorsers, setEndorsers] = useState(props.endorsers)
    return (
        <Card>
            <Card.Title>{props.fullName + (props.title ? ', ' + props.title : '')}</Card.Title>
            <Card.Divider/>
            <Text>{props.approved ? 'Approved' : 'Waiting for approval'}</Text>
            {endorsers && endorsers.length > 0 ? ( <Text>Endorsers: {endorsers.map((endorserId, index) => props.idNameMap[endorserId]).join(', ')}</Text> ): undefined}
            <ContactButton email={props.email}/>
            <EndorseButton target={props.id} endorsers={endorsers} setEndorsers={setEndorsers}/>
            <Button title="View info" onPress={() => props.navigation.navigate("Info", { 'userId' : props.id })} />
        </Card>
    )
}