import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Invest() {

    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
            {/* Goals Section */}
            <View style={styles.goalsContainer}>
                <Text style={styles.sectionTitle}>Your Investment Account</Text>
                {/* Add content for goals here */}

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
