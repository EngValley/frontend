import React from "react";
import { Button, Linking } from "react-native";

export default function ContactButton(props) {
    return <Button onPress={() => Linking.openURL("mailto:" + props.email)} title={props.title || "Contact"}/>
}