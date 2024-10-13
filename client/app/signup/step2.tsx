import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, PanResponder } from 'react-native';
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

    const navigateToStep = (step) => {
        navigation.navigate(`signup/${step}`);
    };

    const updateBudget = (index: number, newAmount: number) => {
        const updatedBudget = [...budgetValues];
        updatedBudget[index].amount = Math.min(Math.max(newAmount, 0), 100000);
        setBudgetValues(updatedBudget);
    };

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
                        <View style={styles.dot} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToStep('step3')}>
                        <View style={styles.dotInactive} />
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>How is your budget?</Text>
                </View>
                <ScrollView style={styles.scrollView}>
                    {budgetValues.map((item, index) => (
                        <View key={index} style={styles.budgetItem}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.categoryText}>{item.category}</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    value={item.amount.toString()}
                                    onChangeText={(text) => updateBudget(index, parseInt(text) || 0)}
                                    keyboardType="numeric"
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
                <TouchableOpacity style={styles.continueButton} onPress={() => navigateToStep('step3')}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
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
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    scrollView: {
        width: '100%',
        marginTop: 20,
    },
    budgetItem: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoryText: {
        fontSize: 18,
        fontFamily: 'Roboto',
        color: '#000000',
    },
    amountInput: {
        width: 80,
        height: 40,
        borderColor: '#66B03E',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontFamily: 'Roboto',
        color: '#000000',
        textAlign: 'right',
    },
    continueButton: {
        backgroundColor: '#C0DFB0',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        position: 'absolute',
        bottom: 30,
    },
    continueButtonText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    sliderContainer: {
        height: 40,
        justifyContent: 'center',
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#000000',
        borderRadius: 2,
    },
    sliderFill: {
        height: 4,
        backgroundColor: '#66B03E',
        borderRadius: 2,
        position: 'absolute',
    },
    sliderThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#66B03E',
        position: 'absolute',
        top: -8,
        marginLeft: -10,
    },
});
