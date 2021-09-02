import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

export default function SkillSelector (props) {
    const disableButton = (level) => props.level == level;

    const levelChanged = (newLevel) => props.onLevelChanged(newLevel);

    return (
        <View>
            <Text>{props.name || 'N/A'}</Text>
            <Button title='Expert' disabled={disableButton('expert')} onPress={() => levelChanged('expert')}/>
            <Button title='Regular' disabled={disableButton('regular')} onPress={() => levelChanged('regular')}/>
        </View>
    )
}