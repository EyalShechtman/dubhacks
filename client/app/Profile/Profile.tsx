import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        investmentAggressiveness: "standard",
        investmentChoice: "round-up"
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (key: string, value: string) => {
        setUserData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient colors={['#66B13E', '#4CAF50']} style={styles.header}>
                <Image
                    source={{ uri: 'https://www.smilisticdental.com/wp-content/uploads/2017/11/blank-profile-picture-973460_960_720.png' }}
                    style={styles.profilePicture}
                />
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.email}>{userData.email}</Text>
            </LinearGradient>

            <View style={styles.content}>
                <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
                    <Ionicons name={isEditing ? "save-outline" : "create-outline"} size={24} color="#66B13E" />
                    <Text style={styles.editButtonText}>{isEditing ? "Save" : "Edit Profile"}</Text>
                </TouchableOpacity>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Name</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.name}
                                onChangeText={(text) => handleChange("name", text)}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.name}</Text>
                        )}
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Email</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.email}
                                onChangeText={(text) => handleChange("email", text)}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.email}</Text>
                        )}
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Phone</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={userData.phone}
                                onChangeText={(text) => handleChange("phone", text)}
                            />
                        ) : (
                            <Text style={styles.value}>{userData.phone}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Investment Preferences</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Aggressiveness</Text>
                        {isEditing ? (
                            <View style={styles.pickerContainer}>
                                {["relaxed", "standard", "aggressive"].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.pickerOption,
                                            userData.investmentAggressiveness === option && styles.pickerOptionSelected
                                        ]}
                                        onPress={() => handleChange("investmentAggressiveness", option)}
                                    >
                                        <Text style={[
                                            styles.pickerOptionText,
                                            userData.investmentAggressiveness === option && styles.pickerOptionTextSelected
                                        ]}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <Text style={styles.value}>{userData.investmentAggressiveness}</Text>
                        )}
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Investment Choice</Text>
                        {isEditing ? (
                            <View style={styles.pickerContainer}>
                                {["round-up", "budget", "both"].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.pickerOption,
                                            userData.investmentChoice === option && styles.pickerOptionSelected
                                        ]}
                                        onPress={() => handleChange("investmentChoice", option)}
                                    >
                                        <Text style={[
                                            styles.pickerOptionText,
                                            userData.investmentChoice === option && styles.pickerOptionTextSelected
                                        ]}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <Text style={styles.value}>{userData.investmentChoice}</Text>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: 'white',
    },
    content: {
        padding: 20,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 2,
    },
    editButtonText: {
        color: '#66B13E',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    section: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    infoRow: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    pickerOption: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    pickerOptionSelected: {
        backgroundColor: '#66B13E',
    },
    pickerOptionText: {
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
    },
    pickerOptionTextSelected: {
        color: 'white',
    },
});