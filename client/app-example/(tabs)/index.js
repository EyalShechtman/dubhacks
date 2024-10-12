import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import auth0 from '@/services/auth0'; // Import the Auth0 service
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const [accessToken, setAccessToken] = useState < string | null > (null); // Allow both string and null
  const [message, setMessage] = useState('');

  // Login function
  const login = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'http://localhost:4000', // Your Express API audience
      });

      // Save the access token for future API calls
      setAccessToken(credentials.accessToken);
      await AsyncStorage.setItem('accessToken', credentials.accessToken);

      setMessage('Logged in successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to login');
    }
  };

  // Fetch the protected resource
  const fetchProtectedResource = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken'); // Get the stored token

      if (!token) {
        setMessage('No access token found. Please log in first.');
        return;
      }

      const response = await fetch('http://localhost:4000/authorized', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Attach the access token
        },
      });

      if (response.status === 401) {
        setMessage('Unauthorized - Invalid token');
      } else {
        const data = await response.text();
        setMessage(`Authorized: ${data}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error fetching resource');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button title="Login" onPress={login} />
      <Button title="Fetch Authorized Resource" onPress={fetchProtectedResource} />
    </View>
  );
};

// Add spacing/padding for better UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
    padding: 20, // Add padding around the content
  },
  buttonSpacing: {
    marginVertical: 20, // Add vertical spacing between buttons
  },
});

export default Index;
