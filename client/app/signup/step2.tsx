import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

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
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={100000}
                                value={item.amount}
                                onValueChange={(value) => updateBudget(index, value)}
                                minimumTrackTintColor="#66B03E"
                                maximumTrackTintColor="#000000"
                                thumbTintColor="#66B03E"
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
        padding: 20,
    },
    backArrow: {
        marginTop: 40,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#66B13E',
        marginHorizontal: 5,
    },
    dotInactive: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 5,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    budgetItem: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    amountInput: {
        width: 80,
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
    },
    slider: {
        marginTop: 10,
    },
    continueButton: {
        backgroundColor: '#66B13E',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});