import React, { useState, useRef,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, PanResponder, Animated,Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { ProgressBar } from 'react-native-paper';
import { generateItin} from './Itinerary'
export default function Goals() {
    const [loading, setLoading] = useState(false);
    const[updateing,setUpdating]=useState(false);
    const { authorize, user } = useAuth0();
    const current = 1900;
    const navigation = useNavigation();
    const genItin = async (goal) => {
        try{
            setLoading(true);

            const email = user ? user.email : "";
            if (!email) {
                Alert.alert('Error', 'User not logged in');
                return;
            }
            const response= await fetch('http://localhost:4000/account/get-intrests',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email:email})
            });
            const result= await response.json();
            if(response.ok && result.interests){
                try {
                    setUpdating(true);
                    // Prepare data for POST request
        
                    const email = user ? user.email : "";
                    const inters=result.interests;
        
                    const response =await generateItin(goal,inters)
        
                    if (response.success) {
                        Alert.alert('Generated Itinerary', response.completion);
                    } else {
                        Alert.alert('Error', 'Failed to generate itinerary');
                    }
                } catch (error) {
                    console.error('Error generating itin:', error);
                    Alert.alert('Error generating itin.');
                } finally {
                    setUpdating(false);
                }
            }else{
                Alert.alert("Could not fetch interests ");
                return;
            }
        }
        catch(error){
            console.error('Error fetching interests, ',error);
        }
        finally{
            setLoading(false);
        }
    }

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
                            onPress={genItin(goal.title)}
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
        },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center', 
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
