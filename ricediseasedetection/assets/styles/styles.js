// styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#045241",
  },
  container_a: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    marginBottom: 10,
  },
  //   image_gallery: {
  //     width: 250, // Adjust width as needed
  //     height: 250, // Adjust height as needed
  //     marginBottom: 40,
  //   },
  slide: {
    padding: 20, // Full width for each slide
    alignItems: "center",
    justifyContent: "center",
  },
  image_gallery: {
    width: 200, // Full width for image
    height: 200, // Adjust height as needed
    marginBottom: 20,
  },
  results_img: {
    width: 295, // Full width for image
    height: 295, // Adjust height as needed
    marginBottom: 20,
    borderRadius: 10,
  },
  logo_text: {
    color: "#fff",
    fontSize: 45,
    fontFamily: "Genos-BoldItalic",
    lineHeight: 45,
    margin: 0,
  },
  logo_text_a: {
    color: "#757575",
    fontSize: 24,
    fontFamily: "Genos-BoldItalic",
    lineHeight: 24,
    marginBottom: 60,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    color: "#242323",
    fontSize: 30,
    textAlign: "center",
    width: 250,
    lineHeight: 30,
  },
  boldText: {
    fontFamily: "Montserrat-Bold", // Change to your desired font family
    color: "#242323", // You can customize the color as needed
  },
  description: {
    fontFamily: "Montserrat-Regular", // This is the regular text style
    color: "#757575",
    fontSize: 16,
    textAlign: "center",
    width: 300,
    margin: 20,
  },
  results_desc: {
    fontFamily: "Montserrat-Regular", // This is the regular text style
    color: "#757575",
    fontSize: 16,
    textAlign: "left",
    width: 300,
  },
  results_head: {
    fontFamily: "Montserrat-Bold", // This is the regular text style
  color:"#000000",
    fontSize: 25,
    textAlign: "left",
    width: 300,
  },
  button: {
    backgroundColor: "#2E7B58", // Background color
    borderRadius: 25, // Rounded corners
    paddingVertical: 15, // Vertical padding
    paddingHorizontal: 30, // Horizontal padding
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
    marginTop: 20, // Add margin to separate the button from the FlatList
  },

  buttonText: {
    color: "#fff", // Text color
    fontSize: 20, // Text size
    fontFamily: "Montserrat-Bold", // Change to your desired font family
    textAlign: "center", // Center align the text
  },
  buttonContainer: {
    marginTop: 20, // Add some space between the FlatList and the button
    alignItems: "center", // Center the button
  },

  // Add more shared styles as needed
});

export default styles;
