import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function SignupStep3() {
    const navigation = useNavigation();
    const [rectangleIndex, setRectangleIndex] = useState(0);

    const navigateToStep = (step) => {
        navigation.navigate(`signup/${step}`);
    };

    const nextRectangle = () => {
        setRectangleIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const prevRectangle = () => {
        setRectangleIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    const rectangles = [
        {
            style: styles.rectangle1,
            content: 'Both (Recommended)',
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
            subtext: 'This is text for monthly overs',
        },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="white"
                    onPress={() => navigation.goBack()}
                    style={styles.backArrow}
                />
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
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>How would you like to invest?</Text>
                </View>
                <TouchableOpacity style={styles.arrowLeft} onPress={prevRectangle}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>

                {/* Rectangle */}
                <View style={rectangles[rectangleIndex].style}>
                    <Text style={styles.rectangleText}>
                        {rectangles[rectangleIndex].content}
                    </Text>
                    <Text style={styles.rectangleSubtext}>
                        {rectangles[rectangleIndex].subtext}
                    </Text>
                </View>

                {/* Right Arrow */}
                <TouchableOpacity style={styles.arrowRight} onPress={nextRectangle}>
                    <Ionicons name="arrow-forward" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigateToStep('step2')}>
                    {/* Button */}
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backArrow: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    dotsContainer: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
    dotInactive: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 4,
    },
    textContainer: {
        marginTop: 100,
        alignSelf: 'center',
        paddingHorizontal: 20,
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    rectangle1: {
        width: width * 0.7,
        height: 150,
        backgroundColor: '#66B13E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 15,
    },
    rectangle2: {
        width: width * 0.7,
        height: 150,
        backgroundColor: '#FF5733',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 15,
    },
    rectangle3: {
        width: width * 0.7,
        height: 150,
        backgroundColor: '#3498DB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 15,
    },
    rectangleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rectangleSubtext: {
        color: 'white',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    arrowLeft: {
        marginRight: 10,
    },
    arrowRight: {
        marginLeft: 10,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: '#66B13E',
        fontSize: 18,
        fontWeight: 'bold',
    },
});