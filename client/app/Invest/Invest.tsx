import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Invest() {
    const navigation = useNavigation();
    const [investmentType, setInvestmentType] = useState('');
    const [investmentStrategy, setInvestmentStrategy] = useState('');
    const [investmentAmount, setInvestmentAmount] = useState(1025.58); // Default amount

    // useEffect(() => {
    //     const fetchInvestmentData = async () => {
    //         try {
    //             const data = await AsyncStorage.getItem('investmentData');
    //             if (data) {
    //                 const { investmentType, investmentStrategy } = JSON.parse(data);
    //                 setInvestmentType(investmentType);
    //                 setInvestmentStrategy(investmentStrategy);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching investment data:', error);
    //         }
    //     };

    //     fetchInvestmentData();
    // }, []);

    // Define the distribution based on the investment strategy
    const getDistribution = (strategy: any) => {
        switch (strategy) {
            case 'Conservative':
                return [0.7, 0.2, 0.1];
            case 'Moderate':
                return [0.4, 0.4, 0.2];
            case 'Aggresive':
                return [0.1, 0.3, 0.6];
            default:
                return [0.33, 0.33, 0.34];
        }
    };

    const distribution = getDistribution(investmentStrategy);

    const chartData = [
        { name: 'Bonds', amount: investmentAmount * distribution[0], color: '#4CAF50' },
        { name: 'ETFs', amount: investmentAmount * distribution[1], color: '#FFC107' },
        { name: 'Stocks', amount: investmentAmount * distribution[2], color: '#F44336' },
    ];

    return (
        <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
            <View style={styles.goalsContainer}>
                <Text style={styles.sectionTitle}>Your Investment Account</Text>

                <PieChart
                    data={chartData}
                    width={300}
                    height={220}
                    chartConfig={{
                        backgroundColor: "white",
                        backgroundGradientFrom: "#66B13E",
                        backgroundGradientTo: "white",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="5"
                    center={[10, 0]}
                    style={styles.pieChart}
                />

                <View style={styles.investmentAmountContainer}> 
                    <Text style={styles.investmentAmountText}>Total Value: ${investmentAmount}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.investmentDetail}>Investment Type: {investmentType || 'Not specified'}</Text>
                    <Text style={styles.investmentDetail}>Investment Strategy: {investmentStrategy || 'Not specified'}</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>

            </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    goalsContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    backButton: {
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 40,
        color: '#333',
        textAlign: 'center',
    },
    pieChart: {
        marginVertical: 20,
        borderRadius: 16,
        alignSelf: 'center',
        paddingRight: 30,
    },
    investmentAmountContainer: {
        marginTop: 0,        // Adjust this value to move the text further down from the pie chart
        alignItems: 'center', // Center-align the text
    },
    investmentAmountText: {
        fontSize: 32,         // Keep the text size large for emphasis
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',  // Ensure the text is centered
    },
        detailsContainer: {
        marginTop: 30,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    investmentDetail: {
        fontSize: 18,
        marginVertical: 10,
        color: '#333',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#66B13E',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
