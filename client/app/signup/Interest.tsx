import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0 } from 'react-native-auth0';

const InterestPage = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { authorize, user } = useAuth0();

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input]);
      setInput('');
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const submitInterests = async () => {
    if (items.length === 0) {
      Alert.alert('No Interests added');
      return;
    }
    try {
      setLoading(true);

      const email = user ? user.email : "";
      const response = await fetch('http://localhost:4000/interest_update/interest_update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email: email, interests: items })
      });

      if (response.ok) {
        navigation.navigate('signup/step2');
      } else {
        Alert.alert('Failed to update interests.');
      }
    } catch (error) {
      console.error('Could not submit interests', error);
      Alert.alert('Could not submit interests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
        <View style={styles.headerWrapper}>
          <Text style={styles.title}>What do you do on your vacations?</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="enter your favorite activities..."
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={addItem}
            returnKeyType="done"
          />
        </View>

        <View style={styles.itemContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.itemBox}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#28A745" />
        ) : (
          <TouchableOpacity onPress={() => submitInterests()} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Interests</Text>
          </TouchableOpacity>
        )}

      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  headerWrapper: {
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
  inputWrapper: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Ensures items appear left-to-right
    marginTop: 10,
    paddingHorizontal: 10, // Adds padding on the sides
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Reduced width for even distribution
    padding: 12, // Increased padding
    backgroundColor: '#f0f0f0', // Light grey background
    borderRadius: 10, // Rounded corners for a cleaner look
    marginBottom: 15, // Space between items
    marginHorizontal: '1%', // Slight horizontal spacing
    borderWidth: 1, // Add subtle border
    borderColor: '#ddd', // Border color
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For Android shadow
  },
  itemText: {
    fontSize: 14,
    flex: 1,
    color: '#333', // Darker text for better visibility
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 6,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '80%',
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#66B13E',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default InterestPage;
