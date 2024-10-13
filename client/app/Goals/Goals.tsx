import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper'; // Import ProgressBar from react-native-paper

export default function Goals() {

    const current = 1900;
    const navigation = useNavigation();

    const goals = [
        { title: 'Trip to Paris', target: 2000, current: current },
        { title: 'Trip to London', target: 4000, current: current }
    ];

    return (
        <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
            {/* Goals Section */}
            <View style={styles.goalsContainer}>
                <Text style={styles.sectionTitle}>Your Goals</Text>
                {/* Add content for goals here */}
            </View>

            <View style={styles.goalsContainer}>
                {goals.map((goal, index) => (
                    <View key={index} style={styles.goalItem}>
                        <Text style={styles.goalTitle}>{goal.title}</Text>
                        <Text style={styles.goalTarget}>Target: ${goal.target}</Text>

                        {/* Remaining Amount */}
                        <Text style={styles.remainingText}>
                            ${goal.target - goal.current} left to reach the goal
                        </Text>

                        <ProgressBar
                            style={styles.progressBar}
                            progress={goal.current / goal.target}
                            color="#66B13E"
                        />

                        {/* View Button */}

                        {/* Generate Itinerary Button */}
                        <TouchableOpacity 
                            style={styles.itineraryButton}
                            onPress={() => console.log(`Generating itinerary for ${goal.title}`)}
                        >
                            <Text style={styles.itineraryButtonText}>Generate Itinerary</Text>
                        </TouchableOpacity>
                    </View>
                ))}
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
        alignItems: 'center', // Center the content horizontally
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center', // Center the text horizontally
        marginTop: 50,
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
    remainingText: {
        fontSize: 14,
        color: '#999', // You can adjust this color as needed
        marginBottom: 5,
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
        marginBottom: 10, // Added margin to separate the buttons
    },
    viewButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    itineraryButton: {
        backgroundColor: '#66B13E',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    itineraryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
