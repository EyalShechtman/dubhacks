import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { ProgressBar } from 'react-native-paper'; // Import ProgressBar from react-native-paper
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LineChartComponent from "./LineChart"; // Import LineChartComponent from components folder
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
    const navigation = useNavigation();

    // Change later, connect to DB
    const investingAmount = '$1025.58';
    const changeInPerc = '1.91';
    const changeInDollar = '$19.2';
    const goals = [
        { title: 'Trip to Paris', target: 2000, current: 1500 },
        { title: 'Trip to London', target: 4000, current: 2000 }
    ];
    const recommendedGoals = [
        { title: 'Ibiza', description: 'Party hard and lay on the beach', image: 'https://example.com/ibiza.jpg' },
        { title: 'Hawaii', description: 'Explore the islands and relax', image: 'https://example.com/hawaii.jpg' }
    ];

    return (
        <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Investing</Text>
                <Text style={styles.investingAmount}>{investingAmount}</Text>
                <Text style={styles.changeInDollar}>
                    ▲ {changeInDollar} ({changeInPerc}%) Past Month
                </Text>
                <Ionicons name="settings" size={24} color="white" style={styles.settingsIcon} />
                <TouchableOpacity onPress={() => navigation.navigate('Profile/Profile')}>
                    <Ionicons name="settings" size={24} color="white" style={styles.settingsIcon} />
                </TouchableOpacity>
            </View>

            {/* Static Line Chart */}
            <View style={styles.chartContainer}>
                <LineChartComponent />
            </View>

            {/* Static Time Filter Buttons */}
            <View style={styles.timeFilters}>
                <TouchableOpacity style={styles.filterButtonSelected}><Text style={styles.filterText}>1M</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>3M</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>YR</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}><Text style={styles.filterText}>YTD</Text></TouchableOpacity>
            </View>

            {/* Scrollable content */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                {/* Upcoming Goals */}
                <View style={styles.goalsContainer}>
                    <Text style={styles.sectionTitle}>Upcoming Goals</Text>
                    {goals.map((goal, index) => (
                        <View key={index} style={styles.goalItem}>
                            <Text style={styles.goalTitle}>{goal.title}</Text>
                            <Text style={styles.goalTarget}>Target: ${goal.target}</Text>
                            <ProgressBar
                                style={styles.progressBar}
                                progress={goal.current / goal.target}
                                color="#66B13E"
                            />
                            <TouchableOpacity
                                style={styles.viewButton}
                                onPress={() => navigation.navigate('Goals/Goals')}
                                >
                                <Text style={styles.viewButtonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Recommended Travel Goals */}
                <View style={styles.recommendedContainer}>
                    <Text style={styles.sectionTitle}>Recommended Travel Goals</Text>
                    {recommendedGoals.map((goal, index) => (
                        <View key={index} style={styles.recommendedGoal}>
                            <Image source={{ uri: goal.image }} style={styles.goalImage} />
                            <View style={styles.goalTextContainer}>
                                <Text style={styles.goalTitle}>{goal.title}</Text>
                                <Text style={styles.goalDescription}>{goal.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#66B13E',
        alignItems: 'flex-start',
        paddingBottom: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    investingAmount: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    changeInDollar: {
        color: 'white',
        fontSize: 16,
    },
    settingsIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    chartContainer: {
        width: screenWidth,
        height: 178, // Add a height to ensure the chart has space to render
        paddingVertical: 0,
        paddingHorizontal: 10,
    },
        timeFilters: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    filterButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        marginHorizontal: 5,
    },
    filterButtonSelected: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#66B13E',
        borderRadius: 20,
        marginHorizontal: 5,
    },
    filterText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    goalsContainer: {
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    goalItem: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    goalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    goalTarget: {
        fontSize: 14,
        color: '#999',
    },
    progressBar: {
        height: 10,
        marginVertical: 10,
    },
    viewButton: {
        backgroundColor: '#66B13E',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    viewButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    recommendedContainer: {
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    recommendedGoal: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    goalImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    goalTextContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    goalDescription: {
        fontSize: 12,
        color: '#777',
    },
});
