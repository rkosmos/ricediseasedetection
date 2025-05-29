// screens/HomeScreen.js
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../assets/styles/styles.js"; // Import the shared styles
export default function HomeScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("AnalyzeRice");
    }, 1000); // Redirects after 1 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/logo_1.png")} // replace with your image path
        style={styles.logo}
      />
      <Text style={styles.logo_text}>BANTAY</Text>
      <Text style={styles.logo_text}>BIGAS</Text>
    </View>
  );
}
