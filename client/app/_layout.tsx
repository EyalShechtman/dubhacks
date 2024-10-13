import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DeviceEventEmitter } from 'react-native';
import Home from "./Home/Home";
import Goals from "./Goals/Goals";
import Invest from "./Invest/Invest";
import Profile from "./Profile/Profile";
import SignupStep3 from "./signup/step3";
import { Ionicons } from '@expo/vector-icons';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const [isSignedUp, setIsSignedUp] = useState(false); // State to track if user signed up

  useEffect(() => {
    // Add an event listener for the custom event 'event1'
    const eventListener = DeviceEventEmitter.addListener("event1", () => {
      // Update the state when the event is triggered
      setIsSignedUp(true);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      eventListener.remove();
    };
  }, []);

  return (
    <Auth0Provider domain={"dev-w5mc4qlyvvazlxk2.us.auth0.com"} clientId={"lBSMealba0tfz3VOyuwVBsR6mZKfrGcX"}>
      {isSignedUp ? (
        // Once the user has signed up, show the bottom tab navigation (Main App)
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              const routeName = route.name.split('/')[0];
              if (routeName === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (routeName === 'Goals') {
                iconName = focused ? 'list' : 'list-outline';
              } else if (routeName === 'Invest') {
                iconName = focused ? 'cash' : 'cash-outline';
              } else if (routeName === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#66B13E',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home/Home" component={Home} options={{ tabBarLabel: 'Home' }} />
          <Tab.Screen name="Goals/Goals" component={Goals} options={{ tabBarLabel: 'Goals' }} />
          <Tab.Screen name="Invest/Invest" component={Invest} options={{ tabBarLabel: 'Invest' }} />
          <Tab.Screen name="Profile/Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
      ) : (
        // Before the user has signed up, show the signup flow
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="signup/step1"
            options={{
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup/Interest"
            options={{
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup/step2"
            options={{
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup/step3"
            options={{
              headerTitle: '',
              headerBackTitleVisible: false,
              headerShown: false,
            }}
          />
        </Stack>
      )}
    </Auth0Provider>
  );
}
