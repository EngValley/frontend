import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    selectorContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexBasis: 'content',
        margin: '0.5em',
        alignContent: 'center'
    },
    selectorText: {
        marginRight: '0.5em'
    },
    selectorButton: {
        width: 'auto',
        height: 'auto'
    }
})

export default function SkillSelector (props) {
    const disableButton = (level) => props.level == level;

    const levelChanged = (newLevel) => props.onLevelChanged(newLevel);

    return (
        <View style={styles.selectorContainer}>
            <Text style={styles.selectorText}>{props.name || 'N/A'}</Text>
            <Button title='Expert' disabled={disableButton('expert')} onPress={() => levelChanged('expert')} style={styles.selectorButton}/>
            <Button title='Regular' disabled={disableButton('regular')} onPress={() => levelChanged('regular')} style={styles.selectorButton}/>
        </View>
    )
}