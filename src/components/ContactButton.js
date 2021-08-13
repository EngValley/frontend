import React from "react";
import { Linking } from "react-native";
import { Button } from "react-native-elements"

export default function ContactButton(props) {
    return <Button onPress={() => Linking.openURL("mailto:" + props.email)} title={props.title || "Contact"}/>
}