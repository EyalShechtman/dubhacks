import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
            {/* Goals Section */}
            <View style={styles.goalsContainer}>
                <Text style={styles.sectionTitle}>Your Profile</Text>
                {/* Add content for goals here */}
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home/Home')}>
                    <Ionicons name="home" size={24} color="white" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Goals/Goals')} >
                    <Ionicons name="list" size={24} color="white" />
                    <Text style={styles.navText}>Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Invest/Invest')}>
                    <Ionicons name="cash" size={24} color="white" />
                    <Text style={styles.navText}>Invest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person" size={24} color="white" />
                    <Text style={styles.navText}>Profile</Text>
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
        padding: 50,
        backgroundColor: '#F5F5F5',
        flex: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#66B13E',
        paddingVertical: 10,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: 'white',
        fontSize: 12,
    },
});
