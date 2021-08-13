import React from 'react'
import { Button, Pressable, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Button onPress={() => navigation.navigate('CandidateList')} title="View candidates" />
                <Button onPress={() => navigation.navigate('LoginSelection')} title="Sign In / Sign Up" />
            </View>
        </View>
    )
}

export default WelcomeScreen