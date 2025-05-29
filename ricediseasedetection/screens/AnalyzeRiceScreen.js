import React, { createRef, useEffect, useRef, useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import styles from "../assets/styles/styles.js";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { loadTensorflowModel } from "react-native-fast-tflite";
import { decode } from "base64-arraybuffer";

const SLIDES = [
  {
    key: "1",
    image: require("../assets/img/rice1.png"),
    title: "A meal without rice is incomplete.",
    description: [
      "Here at ",
      { text: "BantayBigas", style: "bold" },
      ", we understand the massive impact rice has in our community and we want to help protect and cultivate it.",
    ],
    footerImage: require("../assets/img/gtn1.png"),
  },
  {
    key: "2",
    image: require("../assets/img/rice1.png"),
    title: "It’s simple, safe, and free.",
    description: [
      "With ",
      { text: "BantayBigas", style: "bold" },
      ", your data remains private and is solely used to enhance our system, helping us better support communities.",
    ],
    footerImage: require("../assets/img/gtn2.png"),
  },
];

const Slide = ({ item }) => (
  <View style={styles.slide}>
    <Image source={item.image} style={styles.image_gallery} />
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>
      {item.description.map((part, index) =>
        typeof part === "string" ? (
          part
        ) : (
          <Text
            key={index}
            style={part.style === "bold" ? styles.boldText : styles.description}
          >
            {part.text}
          </Text>
        )
      )}
    </Text>
    <Image
      style={{ width: 19, height: 8, marginBottom: 20 }}
      source={item.footerImage}
    />
  </View>
);

export default function AnalyzeRiceScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const currentIndexRef = useRef(0);
  const [_, setCurrentIndex] = useState(0);
  const [isCameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [prediction, setPrediction] = useState("Unknown");

  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  const analyzeImage = async () => {
    console.info("Ticking...");
    const imageUri = (
      await cameraRef.current.takePictureAsync({
        exif: false,
        quality: 0.45,
        scale: 50,
        fastMode: true,
        shutterSound: false,
        skipProcessing: true,
      })
    ).uri;
    console.log("Captured Image URI:", imageUri);

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
      },
      body: form,
    };

    // Send the request to the server
    // const response = await fetch("https://ml-09482.mihou.dev/infer", options);
    // const response = await fetch("http://192.168.2.228:9989/infer", options);
    const response = await fetch(
      "https://rice-disease-py-1.onrender.com/infer",
      options
    );
    const data = await response.json();
    setPrediction(data.result.predicted_label);
    console.log("Response from server:", data);
  };

  const tick = () => {
    setTimeout(async () => {
      if (!isCameraReady) return;
      await analyzeImage();
      tick();
    }, 10_000);
  };

  useEffect(() => {
    if (isCameraReady) {
      console.info("Tick started.");
      tick();
    }
  }, [isCameraReady]);

  const changeSlide = (index) => {
    const newIndex = (index + SLIDES.length) % SLIDES.length;
    currentIndexRef.current = newIndex;
    setCurrentIndex(newIndex);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dx) > 10,

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          changeSlide(currentIndexRef.current - 1);
        } else if (gestureState.dx < 0) {
          changeSlide(currentIndexRef.current + 1);
        }
      },
    })
  ).current;
  const classLabels = ["BrownSpot", "Healthy", "Hispa", "LeafBlast"];
  let model;

  const handleAnalyzeRice = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera permission is required.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;

        const resized = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 224, height: 224 } }],
          { base64: true }
        );

        const buffer = decode(resized.base64);
        const imageBytes = new Uint8Array(buffer);
        const floatInput = new Float32Array(224 * 224 * 3);

        for (let i = 0; i < floatInput.length; i++) {
          floatInput[i] = imageBytes[i] / 255.0;
        }

        if (!model) {
          model = await loadTensorflowModel(require("../assets/model.tflite")); // put your model in assets
        }

        const output = await model.run(floatInput, [1, 224, 224, 3]);
        const scores = output[0];
        const predictedIndex = scores.indexOf(Math.max(...scores));
        const predictedLabel = classLabels[predictedIndex];

        navigation.navigate("Results", {
          data: { scores, predicted_label: predictedLabel },
          imageUri,
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <View style={styles.container_a}>
      <Text style={styles.logo_text_a}>BANTAY BIGAS</Text>
      {/* <Text style={{ paddingVertical: 10 }}>{prediction}</Text> */}
      <View style={{ height: 500 }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            alignItems: "center",
            justifyContent: "center",
          }}
          {...panResponder.panHandlers}
        >
          <Slide item={SLIDES[currentIndexRef.current]} />
        </Animated.View>
      </View>
      {/* <CameraView style={{ height: 200, width: '100%', flex: 1 }}
                  facing={"back"}
                  autofocus={"on"}
                  ref={cameraRef}
                  animateShutter={false}
                  mute={true}
                  onCameraReady={() => setCameraReady(true)}>
      </CameraView> */}
      <TouchableOpacity style={styles.button} onPress={handleAnalyzeRice}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LiveCamera")}
      >
        <Text style={styles.buttonText}>Live Camera</Text>
      </TouchableOpacity>
    </View>
  );
}
