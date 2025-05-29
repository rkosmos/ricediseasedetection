import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  TransitionPresets,
} from "@react-navigation/native-stack";

//Screens
import HomeScreen from "./screens/HomeScreen";
import AnalyzeRiceScreen from "./screens/AnalyzeRiceScreen"; // New AnalyzeRice screen
import ResultsScreen from "./screens/ResultsScreen"; // New AnalyzeRice screen
import LiveCameraScreen from "./screens/LiveCameraScreen"; // New AnalyzeRice screen

// Initialize the Stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Genos-BoldItalic": require("./assets/fonts/Genos-BoldItalic.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide headers for all screens
          // ...TransitionPresets.FadeFromBottomAndroid,
          animation: "fade", // Use fade transition
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnalyzeRice"
          component={AnalyzeRiceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LiveCamera"
          component={LiveCameraScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
