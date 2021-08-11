import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';

export default WelcomeScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Pressable onPress={() => navigation.navigate('HomeScreen')}>

                </Pressable>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View Candidates</Text>
                    <Text style={styles.buttonText}>Sign Up/Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
