import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import styles from "../assets/styles/styles.js"; // Ensure you have the appropriate styles

export default function ResultsScreen({ navigation, route }) {
  const handleBack = () => {
    navigation.navigate("AnalyzeRice"); // Navigate to Home screen
  };
  const renderBullet = (header, description) => (
    <Text>
      {"\u2022"}{" "}
      <Text style={{ fontFamily: "Montserrat-SemiBold" }}>{header}</Text>{" "}
      {description}
      {"\n"}
    </Text>
  );
  // Extract the data passed via navigation
  const { data, imageUri } = route.params;

  return (
    <View style={styles.container_a}>
      <Text style={[styles.logo_text_a, { marginBottom: 10 }]}>
        BANTAY BIGAS
      </Text>
      <View style={{ height: 600 }}>
        <ScrollView>
          <Image source={{ uri: imageUri }} style={styles.results_img} />
          <Text style={styles.results_desc}>Your rice health status is</Text>

          {/* Healthy Condition */}
          {data.result.predicted_label === "Healthy" && (
            <Text style={styles.results_desc}>
              <Text style={styles.results_head}>Healthy! 🎉</Text>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat-Bold" }}>Keep It Up!</Text>
              {"\n"}
              {"\u2022"} To ensure your rice stays healthy:
              {"\n"}
              {"\u2022"} Continue checking moisture levels regularly.
              {"\n"}
              {"\u2022"} Monitor sunlight exposure for optimal growth.
              {"\n"}
              {"\u2022"} Stay proactive against pests.
              {"\n"}
              {"\n"} {/* This extra line break is for spacing */}
              With your care, you’re on track for a fantastic harvest! 🌟
            </Text>
          )}

          {data.result.predicted_label === "BrownSpot" && (
            <Text style={styles.results_desc}>
              <Text style={styles.results_head}>Brown Spot Detected ⚠️</Text>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat-Bold" }}>What to Do:</Text>
              {"\n"}
              {renderBullet(
                "Inspect Your Crop:",
                "Look for brown spots and signs of spread."
              )}
              {renderBullet(
                "Remove Affected Leaves:",
                "Cut away any infected leaves."
              )}
              {renderBullet(
                "Enhance Airflow:",
                "Ensure plants have enough space between them."
              )}
              {renderBullet(
                "Consider Fungicide:",
                "Apply a fungicide designed for Brown Spot."
              )}
              {renderBullet(
                "Plan for Next Season:",
                "Try crop rotation to reduce recurrence."
              )}
              {"\n"}
              Stay Proactive! With timely action, you can manage this issue and
              help your rice recover! 🌱
            </Text>
          )}
          {data.result.predicted_label === "LeafBlast" && (
            <Text style={styles.results_desc}>
              <Text style={styles.results_head}>Leaf Blast Detected ⚠️</Text>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat-Bold" }}>What to Do:</Text>
              {"\n"}
              {renderBullet(
                "Inspect Your Crop:",
                "Look for elongated, water-soaked lesions on leaves."
              )}
              {renderBullet(
                "Remove Affected Leaves:",
                "Cut and dispose of infected leaves to prevent spread."
              )}
              {renderBullet(
                "Improve Airflow:",
                "Space out your plants to enhance air circulation."
              )}
              {renderBullet(
                "Apply Fungicide:",
                "Consider using a fungicide specifically for Leaf Blast."
              )}
              {renderBullet(
                "Practice Crop Rotation:",
                "Rotate crops next season to minimize recurrence."
              )}
              {"\n"}
              Take Action! Prompt steps can help manage this disease and protect
              your rice! 🌱
            </Text>
          )}

          {data.result.predicted_label === "HISPA" && (
            <Text style={styles.results_desc}>
              <Text style={styles.results_head}>HISPA Detected ⚠️</Text>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat-Bold" }}>What to Do:</Text>
              {"\n"}
              {renderBullet(
                "Inspect Your Crop:",
                "Look for signs of feeding damage and shiny larvae on leaves."
              )}
              {renderBullet(
                "Remove Infested Plants:",
                "Cut and dispose of severely affected plants."
              )}
              {renderBullet(
                "Monitor for Pests:",
                "Regularly check for adult beetles and larvae."
              )}
              {renderBullet(
                "Consider Insecticides:",
                "Use an appropriate insecticide if necessary."
              )}
              {renderBullet(
                "Maintain Healthy Practices:",
                "Ensure good soil health and water management to strengthen your crop."
              )}
              {"\n"}
              Act Quickly! Taking action now can help protect your rice from
              further damage! 🌱
            </Text>
          )}
          <Text style={styles.results_desc}>
            <Text style={{ fontSize: 14 }}>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat-Semibold" }}>
                SCORES:{" "}
              </Text>
              {"\n"}
              {`Brownspot: ${data.result.scores[0]}, \n`}
              {`Healthy: ${data.result.scores[1]}, \n`}
              {`Leafblast: ${data.result.scores[2]}, \n`}
              {`HISPA: ${data.result.scores[3]}`}
            </Text>
          </Text>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
