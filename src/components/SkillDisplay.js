import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";

const styles = StyleSheet.create({
    displayContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 'content',
        margin: '0.5em',
        alignContent: 'center'
    },
    displayText: {
        marginRight: '0.5em'
    },
    displayButton: {
        width: 'auto',
        height: 'auto'
    }
})

export default function SkillDisplay (props) {
    const name = () => props.name || 'N/A';

    const disableButton = (level) => props.level == level;

    const levelChanged = (newLevel) => props.onLevelChanged(newLevel);

    return (
        <View style={styles.displayContainer}>
            <Text style={styles.displayText}>{name()}</Text>
            <Button title='Expert' disabled={disableButton('expert')} onPress={() => levelChanged('expert')} style={styles.displayButton}/>
            <Button title='Regular' disabled={disableButton('regular')} onPress={() => levelChanged('regular')} style={styles.displayButton}/>
            <Button title='X' onPress={() => levelChanged(undefined)} style={styles.displayButton}/>
        </View>
    )
}