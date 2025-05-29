import React, { createRef, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import styles from "../assets/styles/styles.js";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function LiveCameraScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndexRef = useRef(0);
  const [_, setCurrentIndex] = useState(0);
  const [isCameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [prediction, setPrediction] = useState("Unknown");
  const [scores, setScores] = useState("Unknown");
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isFlashOn, setFlash] = useState(false);

  const handleBack = () => {
    navigation.navigate("AnalyzeRice"); // Navigate to Home screen
  };

  const flash = () => {
    setFlash(!isFlashOn);
  };
  const analyzeImage = () => {
    cameraRef.current.takePictureAsync({
      exif: false,
      quality: 0.25,
      fastMode: true,
      shutterSound: false,
      skipProcessing: true,
      onPictureSaved: (image) => {
        const imageUri = image.uri;

        const form = new FormData();
        form.append("image", {
          uri: imageUri,
          name: "rice_image.jpg",
          type: "image/jpeg",
        });

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            "User-Agent": "Analysis/10.2.0",
            "X-Deter": "123",
          },
          body: form,
        };

        // Send the request to the server
        // const response = await fetch(
        //   "https://ml-09482.mihou.dev/infer",
        //   options
        // );
        // const response = await fetch(
        //   "http://192.168.2.228:9989/infer",
        //   options
        // );
        fetch("http://192.168.1.3:9989/infer", options)
          .then((data) => data.json())
          .then((data) => {
            setPrediction(data.result.predicted_label);
            setScores(data.result.scores);
          });
      },
    });
  };

  const tick = () => {
    setTimeout(async () => {
      if (!isCameraReady) return;
      analyzeImage();
      tick();
    }, 2_000);
  };

  useEffect(() => {
    if (isCameraReady) {
      console.info("Tick started.");
      tick();
    }
  }, [isCameraReady]);

  return (
    <ScrollView>
      <View style={styles.container_a}>
        <Text style={[styles.logo_text_a, { marginBottom: 0, marginTop: 50 }]}>
          BANTAY BIGAS
        </Text>
        <View style={{ alignItems: "flex-start", width: "100%" }}>
          <Text style={[styles.results_desc, { marginTop: 20 }]}>
            Your rice health status is
          </Text>
          <Text style={styles.results_head}>{prediction}</Text>
          {/* 
          {prediction === "Healthy" && (
            <Text style={styles.results_head}>Healthy! 🎉</Text>
          )}
          {prediction === "BrownSpot" && (
            <Text style={styles.results_head}>Brown Spot Detected ⚠️</Text>
          )}
          {prediction === "HISPA" && (
            <Text style={styles.results_head}>Leaf Blast Detected ⚠️</Text>
          )}
          {prediction === "LeafBlast" && (
            <Text style={styles.results_head}>HISPA Detected ⚠️</Text>
          )} */}
        </View>
        <CameraView
          style={{ height: 700, width: "100%", flex: 1, marginTop: 10 }}
          facing={"back"}
          autofocus={"on"}
          ref={cameraRef}
          animateShutter={false}
          mute={true}
          enableTorch={isFlashOn}
          onCameraReady={() => setCameraReady(true)}
        ></CameraView>
        <View style={{ alignItems: "flex-start", width: "100%" }}>
          <Text style={styles.results_desc}>
            <Text style={{ fontSize: 14 }}>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat-Semibold" }}>
                SCORES:{" "}
              </Text>
              {"\n"}
              {`Brownspot: ${scores[0]}, \n`}
              {`Healthy: ${scores[1]}, \n`}
              {`HISPA: ${scores[2]}, \n`}
              {`Leafblast: ${scores[3]}`}
            </Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={flash}>
          <Text style={styles.buttonText}>
            {isFlashOn ? "Turn off Flash" : "Turn on Flash"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
