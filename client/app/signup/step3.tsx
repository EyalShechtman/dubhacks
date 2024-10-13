import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

export default function SignupStep1() {
    const navigation = useNavigation();
    const [rectangleIndex, setRectangleIndex] = useState(0);

    const navigateToStep = (step) => {
        navigation.navigate(`signup/${step}`);
    };

    const toggleRectangle = () => {
        setRectangleIndex((prevIndex) => (prevIndex + 1) % 3);  // Cycle through 0, 1, and 2
    };

    const rectangles = [
        {
            style: styles.rectangle1,
            content: 'Both (Recomended)',
            subtext: 'A round-up investing account rounds up purchases to the nearest dollar and invests the spare change, helping you grow wealth passively.',
        },
        {
            style: styles.rectangle2,
            content: 'Round Up',
            subtext: 'This is text for RoundUP',
        },
        {
            style: styles.rectangle3,
            content: 'Monthly left overs',
            subtext: 'this is text for monthly overs',
        },
    ];

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
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step2')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step3')}>
                        <View style={styles.dot} />
                    </TouchableOpacity>
                </View>
                {/* Text Container */}
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>How would you like to invest?</Text>
                </View>
                <TouchableOpacity
                    style={rectangles[rectangleIndex].style}  // Apply the current rectangle's style
                    onPress={toggleRectangle}
                >
                    <Text style={styles.rectangleText}>
                        {rectangles[rectangleIndex].content}  {/* Display the current rectangle's content */}
                    </Text>
                    <Text style={styles.rectangleSubtext}>
                        {rectangles[rectangleIndex].subtext}  {/* Display the current rectangle's subtext */}
                    </Text>
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
    rectangle1: {
        marginTop: 50,
        width: 350,
        height: 150,
        backgroundColor: '#66B13E', // Green for Rectangle 1
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    rectangle2: {
        marginTop: 50,
        width: 200,
        height: 100,
        backgroundColor: '#FF5733', // Orange for Rectangle 2
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    rectangle3: {
        marginTop: 50,
        width: 200,
        height: 100,
        backgroundColor: '#3498DB', // Blue for Rectangle 3
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    rectangleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rectangleSubtext: {
        color: 'white',
        fontSize: 14,
        marginTop: 10,  // Add space between main text and subtext
    }
});