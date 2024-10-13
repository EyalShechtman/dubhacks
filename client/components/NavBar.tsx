import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Page1 from '../app/navbar/Page1';
import Page2 from '../app/navbar/Page2';
import Page3 from '../app/navbar/Page3';
import Page4 from '../app/navbar/Page4';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function NavbarStack() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Page1') {
                            iconName = 'home'; // Icon for Page 1
                        } else if (route.name === 'Page2') {
                            iconName = 'list';
                        } else if (route.name === 'Page3') {
                            iconName = 'settings';
                        } else if (route.name === 'Page4') {
                            iconName = 'person';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Page1" component={Page1} options={{ title: 'Home' }} />
                <Tab.Screen name="Page2" component={Page2} options={{ title: 'List' }} />
                <Tab.Screen name="Page3" component={Page3} options={{ title: 'Settings' }} />
                <Tab.Screen name="Page4" component={Page4} options={{ title: 'Profile' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
