import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, DeviceEventEmitter, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0 } from 'react-native-auth0';

const { width } = Dimensions.get('window');

export default function SignupStep3() {
    const navigation = useNavigation();
    const [rectangleIndex1, setRectangleIndex1] = useState(0);
    const [rectangleIndex2, setRectangleIndex2] = useState(0);
    const { authorize, user } = useAuth0();
    
    const finishSignup = async () => {
        const investmentType = rectangles1[rectangleIndex1].content;
        const investmentStrategy = rectangles2[rectangleIndex2].content;

        // Save the investment data to AsyncStorage
        try {
            await submitInvestment();

            await AsyncStorage.setItem('investmentData', JSON.stringify({
                investmentType,
                investmentStrategy
            }));
        } catch (error) {
            console.error('Could not finish signup,', error);
            Alert.alert('Failed to submit investment details');
        }

        // Emit event (if needed)
        DeviceEventEmitter.emit("event1");

        // Navigate to Home
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home/Home' }],
        });
    };

    const submitInvestment = async () => {
        const investmentTypes = ['roundup', 'budget remaining', 'both'];
        const investmentComforts = ['conservative', 'moderate', 'aggressive'];
        const investType = investmentTypes[rectangleIndex1];
        const investComfort = investmentComforts[rectangleIndex2];
        try {
            console.log(user);

            const email = user ? user.email : "";
            console.log(email);
            const response = await fetch('http://localhost:4000/investment/investment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email: email, investComfort: investComfort, investType: investType })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "failed to submit investment details");
            }
            console.log('Investment details: ', data);
        } catch (error) {
            console.error('Error submitting investment details', error);
            Alert.alert('Error submitting ivnestment details');
        }
    }

    const navigateToStep = (step) => {
        navigation.navigate(`signup/${step}`);
    };

    const nextRectangle1 = () => {
        setRectangleIndex1((prevIndex) => (prevIndex + 1) % 3);
    };

    const prevRectangle1 = () => {
        setRectangleIndex1((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    const nextRectangle2 = () => {
        setRectangleIndex2((prevIndex) => (prevIndex + 1) % 3);
    };

    const prevRectangle2 = () => {
        setRectangleIndex2((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    const rectangles1 = [
        { style: styles.rectangle1, content: 'Round-Up' },
        { style: styles.rectangle2, content: 'Excess budget' },
        { style: styles.rectangle3, content: 'Both (Rec)' },
    ];

    const rectangles2 = [
        { style: styles.rectangle4, content: 'Conservative' },
        { style: styles.rectangle5, content: 'Moderate' },
        { style: styles.rectangle6, content: 'Aggresive' },
    ];

    const summaries = [
        ['Summary for Set 1, Option 1', 'Summary for Set 1, Option 2', 'Summary for Set 1, Option 3'],
        ['Summary for Set 2, Option 1', 'Summary for Set 2, Option 2', 'Summary for Set 2, Option 3'],
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

                {/* Set 1 */}
                <View style={styles.rectangleContainer}>
                    <TouchableOpacity style={styles.arrowLeft} onPress={prevRectangle1}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={rectangles1[rectangleIndex1].style}>
                        <Text style={styles.rectangleText}>{rectangles1[rectangleIndex1].content}</Text>
                        {/* <Text style={styles.rectangleSubtext}>{rectangles1[rectangleIndex1].subtext}</Text> */}
                    </View>
                    <TouchableOpacity style={styles.arrowRight} onPress={nextRectangle1}>
                        <Ionicons name="arrow-forward" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Set 2 */}
                <View style={styles.rectangleContainer}>
                    <TouchableOpacity style={styles.arrowLeft} onPress={prevRectangle2}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={rectangles2[rectangleIndex2].style}>
                        <Text style={styles.rectangleText}>{rectangles2[rectangleIndex2].content}</Text>
                        {/* <Text style={styles.rectangleSubtext}>{rectangles2[rectangleIndex2].subtext}</Text> */}
                    </View>
                    <TouchableOpacity style={styles.arrowRight} onPress={nextRectangle2}>
                        <Ionicons name="arrow-forward" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Summary */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Summary</Text>
                    <Text style={styles.summaryText}>{summaries[0][rectangleIndex1]}</Text>
                    <Text style={styles.summaryText}>{summaries[1][rectangleIndex2]}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={finishSignup}>
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
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 110,
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    rectangle1: {
        width: width * 0.5,
        marginTop: 'auto',
        height: 40,
        backgroundColor: '#FEF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 0,
    },
    rectangle2: {
        width: width * 0.5,
        marginTop: 'auto',
        height: 40,
        backgroundColor: '#FEF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 0,
    },
    rectangle3: {
        width: width * 0.5,
        marginTop: 'auto',
        height: 40,
        backgroundColor: '#FEF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 0,
    },
    rectangle4: {
        width: width * 0.5,
        marginTop: 'auto',
        height: 40,
        backgroundColor: '#FEF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 0,
    },
    rectangle5: {
        width: width * 0.5,
        marginTop: 'auto',
        height: 40,
        backgroundColor: '#FEF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 0,
    },
    rectangle6: {
        width: width * 0.5,
        marginTop: 'auto',
        height: 40,
        backgroundColor: '#FEF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 0,
    },
    rectangleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginVertical: 10,
    },
    rectangleText: {
        color: 'black',
        fontSize: 18,
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    // rectangleSubtext: {
    //     color: 'white',
    //     fontSize: 14,
    //     marginTop: 10,
    //     textAlign: 'center',
    // },
    summaryBox: {
        marginTop: 30,
        backgroundColor: '#E0E0E0',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 14,
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

