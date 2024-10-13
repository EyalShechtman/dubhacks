import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { useNavigation } from '@react-navigation/native';

const LoginButton = ({ setAccessToken }) => {
  const { authorize, getCredentials } = useAuth0();
  const navigation = useNavigation();

  const onPress = async () => {
    try {
      await authorize();
      const credentials = await getCredentials();
      if (credentials) {
        setAccessToken(credentials.accessToken);
        navigation.navigate("signup/step1"); // Navigate to signup page
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Login with Auth0</Text>
    </TouchableOpacity>
  );
};

export default function Index() {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <>
      <LinearGradient colors={['#66B13E', '#FFFFFF']} style={styles.gradient}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>RoamRich</Text>
        </View>
        <View style={styles.container}>
          <LoginButton setAccessToken={setAccessToken} />
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: 50, // Adjust this to control how far from the top the text is
    alignSelf: 'center', // Horizontally center the text
  },
  welcomeText: {
    color: '#FFFFFF', // White text
    marginTop: 30, // Margin from the top
    fontSize: 32, // Font size 32
    fontFamily: 'Roboto', // Font style Roboto (Make sure Roboto is available or use Expo fonts)
    fontWeight: 'bold',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#D3D3D3', // Light gray background
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#000', // Shadow color for iOS style
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 18, // Bigger font size for the button text
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
