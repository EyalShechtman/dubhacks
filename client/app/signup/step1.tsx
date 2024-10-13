import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

export default function SignupStep1() {
    const navigation = useNavigation();

    const navigateToStep = (step) => {
        navigation.navigate(`signup/${step}`);
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
                <Ionicons
                    name="arrow-back"
                    size={20}
                    color="white"
                    onPress={() => navigation.goBack()}
                    style={styles.backArrow}
                />
                {/* Dots Container */}
                <View style={styles.dotsContainer}>
                    <TouchableOpacity onPress={() => navigateToStep('step1')}>
                        <View style={styles.dot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step2')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step3')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                </View>
                {/* Text Container */}
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>How Would you like to transfer funds?</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigateToStep('step2')}>
                    <View style={styles.buttonContent}>
                        <Ionicons name="open-outline" size={24} color="#66B13E" />
                        <Text style={styles.buttonText}>Link Bank Account</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigateToStep('step2')}>
                    <View style={styles.buttonContent}>
                        <Ionicons name="open-outline" size={24} color="#66B13E" />
                        <Text style={styles.buttonText}>Link Credit Card</Text>
                    </View>
                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Ensure the container takes up the full screen
    },
    backArrow: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    dotsContainer: {
        position: 'absolute',
        top: 100,   // Move the dots to the top
        left: 60,  // Align the dots with the back arrow
        flexDirection: 'row',
        alignItems: 'center', // Align dots vertically in a row
    },
    dot: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: 'white', // Active dot white
        marginHorizontal: 5,
    },
    dotInactive: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: 'black', // Inactive dots black
        marginHorizontal: 5,
    },
    textContainer: {
        marginTop: 150,
        alignSelf: 'center',  // Center the text
    },
    welcomeText: {
        color: '#FFFFFF', // White text
        fontSize: 32,     // Font size 32
        fontFamily: 'Roboto', // Font style Roboto (Make sure Roboto is available or use Expo fonts)
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gradient: {
        flex: 1,  // Ensure the gradient takes up the full screen
        width: '100%',  // Take full width
        height: '100%',  // Take full height
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 50,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,  // Reduced horizontal padding
        borderRadius: 25,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#66B13E',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,  // Add some space between the icon and text
    },
});
