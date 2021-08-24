import React from "react";
import { Card, Text } from 'react-native-elements'

export default function QACard( props ) {
    return (
        <Card>
            <Card.Title>{props.question}</Card.Title>
            <Card.Divider/>
            <Text>{props.answer}</Text>
        </Card>
    )
}