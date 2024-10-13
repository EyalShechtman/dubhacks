import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, PanResponder, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

interface CustomSliderProps {
    value: number;
    onValueChange: (value: number) => void;
    minimumValue: number;
    maximumValue: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({ value, onValueChange, minimumValue, maximumValue }) => {
    const [sliderWidth, setSliderWidth] = useState(0);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const newValue = (gestureState.moveX / sliderWidth) * (maximumValue - minimumValue) + minimumValue;
            onValueChange(Math.max(minimumValue, Math.min(maximumValue, newValue)));
        },
    });

    return (
        <View
            style={styles.sliderContainer}
            onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
            {...panResponder.panHandlers}
        >
            <View style={styles.sliderTrack} />
            <View style={[styles.sliderFill, { width: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` }]} />
            <View style={[styles.sliderThumb, { left: `${((value - minimumValue) / (maximumValue - minimumValue)) * 100}%` }]} />
        </View>
    );
};

export default function SignupStep2() {
    const navigation = useNavigation();
    const [budgetValues, setBudgetValues] = useState([
        { category: 'Groceries', amount: 50000 },
        { category: 'Rent', amount: 70000 },
        { category: 'Utilities', amount: 15000 },
        { category: 'Entertainment', amount: 20000 }
    ]);

    const buttonScale = useRef(new Animated.Value(1)).current;

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(buttonScale, {toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();
    };

    const navigateToStep = (step) => {
        animateButton();
        setTimeout(() => navigation.navigate(`signup/${step}`), 200);
    };

    const updateBudget = (index: number, newAmount: number) => {
        const updatedBudget = [...budgetValues];
        updatedBudget[index].amount = Math.min(Math.max(newAmount, 0), 100000);
        setBudgetValues(updatedBudget);
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                    accessibilityLabel="Go Back"
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.dotsContainer}>
                    <TouchableOpacity onPress={() => navigateToStep('step1')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step2')}>
                        <View style={styles.dot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step3')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>How is your budget?</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    {budgetValues.map((item, index) => (
                        <View key={index} style={styles.budgetItem}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.categoryText}>{item.category}</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    value={item.amount.toString()}
                                    onChangeText={(text) => updateBudget(index, parseInt(text) || 0)}
                                    keyboardType="numeric"
                                    accessibilityLabel={`${item.category} budget amount`}
                                />
                            </View>
                            <CustomSlider
                                minimumValue={0}
                                maximumValue={100000}
                                value={item.amount}
                                onValueChange={(value: number) => updateBudget(index, value)}
                            />
                        </View>
                    ))}
                </ScrollView>

                <Animated.View style={[styles.continueButtonContainer, { transform: [{ scale: buttonScale }] }]}>
                    <TouchableOpacity 
                        style={styles.continueButton} 
                        onPress={() => navigateToStep('step3')}
                        accessibilityLabel="Continue to next step"
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </Animated.View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
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
        marginBottom: 20,
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    budgetItem: {
        marginBottom: 30,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 20,
        fontFamily: 'Roboto',
        color: '#000000',
        fontWeight: '500',
    },
    amountInput: {
        width: 100,
        height: 44,
        borderColor: '#66B03E',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: 'right',
        backgroundColor: '#FFFFFF',
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    continueButtonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    continueButton: {
        backgroundColor: '#C0DFB0',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    continueButtonText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    sliderContainer: {
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#EAEAEA',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    sliderTrack: {
        height: 6,
        backgroundColor: '#CCCCCC',
        borderRadius: 3,
    },
    sliderFill: {
        height: 6,
        backgroundColor: '#66B03E',
        borderRadius: 3,
        position: 'absolute',
    },
    sliderThumb: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#66B03E',
        position: 'absolute',
        top: -11,
        marginLeft: -14,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});
