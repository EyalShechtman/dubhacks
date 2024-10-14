import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0 } from 'react-native-auth0';
import { use } from '../../../server/routes/account';

export default function SignupStep1() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const { authorize, user } = useAuth0();

    const navigateToStep = (step) => {
        navigation.navigate(`signup/${step}`);
    };

    useEffect(() => {
        initUser();
    }, []);

    const initUser = async () => {
        try {
            setLoading(true);

            const email = user ? user.email : "";
            const response = await fetch('http://localhost:4000/accounts/init-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email: email })
            });

            if (response.status === 400) {
                console.log('Account already initialized');
            } else if (!response.ok || response.status !== 400) {
                Alert.alert('Failed to initialize account.');
            }
        }
        catch (error) {
            Alert.alert('Could not send request');
        }
        finally {
            setLoading(false);
        }
    }

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
                    <Text style={styles.welcomeText}>How would you like to transfer funds?</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signup/Interest')}>
                        <View style={styles.buttonContent}>
                            <Ionicons name="open-outline" size={24} color="#66B13E" />
                            <Text style={styles.buttonText}>Link Bank Account</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signup/Interest')}>
                        <View style={styles.buttonContent}>
                            <Ionicons name="open-outline" size={24} color="#66B13E" />
                            <Text style={styles.buttonText}>Link Credit Card</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 100,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: '80%',
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
        marginLeft: 10,
    },
});