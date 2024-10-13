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
    const [investmentAmount, setInvestmentAmount] = useState(10000); // Default amount

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
        { name: 'Conservative', amount: investmentAmount * distribution[0], color: '#4CAF50' },
        { name: 'Moderate', amount: investmentAmount * distribution[1], color: '#FFC107' },
        { name: 'Aggressive', amount: investmentAmount * distribution[2], color: '#F44336' },
    ];

    return (
        <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
            <View style={styles.goalsContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
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
                    paddingLeft="15"
                    center={[10, 0]}
                    style={styles.pieChart}
                />
                
                <View style={styles.investmentAmountContainer}>
                    <Text style={styles.investmentAmountText}>${investmentAmount}</Text>
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
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    backButton: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    pieChart: {
        marginVertical: 8,
        borderRadius: 16,
        alignSelf: 'center',
    },
    investmentAmountContainer: {
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    investmentAmountText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    detailsContainer: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
    },
    investmentDetail: {
        fontSize: 16,
        marginVertical: 5,
        color: '#333',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: '35%',
    },
    buttonText: {
        color: '#66B13E',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 0,
        alignContent: 'center',
    },
});