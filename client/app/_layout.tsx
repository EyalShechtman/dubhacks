import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Main login page */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Signup Step 1 page */}
      <Stack.Screen
        name="signup/step1"
        options={{
          headerTitle: '', // Optional: Can remove title to keep UI clean
          headerBackTitleVisible: false, // No back button title
          headerShown: false, // Hide the header
        }}
      />
      <Stack.Screen
        name="signup/step2"
        options={{
          headerTitle: '', // Optional: Can remove title to keep UI clean
          headerBackTitleVisible: false, // No back button title
          headerShown: false, // Hide the header
        }}
      />
      <Stack.Screen
        name="signup/step3"
        options={{
          headerTitle: '', // Optional: Can remove title to keep UI clean
          headerBackTitleVisible: false, // No back button title
          headerShown: false, // Hide the header
        }}
      />
    </Stack>
  );
}
