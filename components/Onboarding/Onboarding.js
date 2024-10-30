import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon

const { width, height } = Dimensions.get("window");

const Onboarding = ({ onComplete }) => {
  const scrollViewRef = useRef(null);
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < slides.length - 1) {
      scrollViewRef.current.scrollTo({
        x: width * (currentScreen + 1),
        animated: true,
      });
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to login screen upon completion
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      scrollViewRef.current.scrollTo({
        x: width * (currentScreen - 1),
        animated: true,
      });
      setCurrentScreen(currentScreen - 1);
    }
  };

  const slides = [
    {
        image: require("../../assets/onboarding/onboarding1.png"),
        title: "Welcome!",
        description: "The Ultimate Guide for Cooking Enthusiasts. Discover your creativity in the kitchen with us and embark on a journey full of flavors!",
        icon: "home" // FontAwesome icon name
    },
    {
        image: require("../../assets/onboarding/onboarding2.png"),
        title: "Discover Recipes",
        description: "Find what you're looking for among thousands of delicious recipes. Whether it's breakfast, lunch, or dinner, there's something for every taste here!",
        icon: "cutlery" // FontAwesome icon name
    },
    {
        image: require("../../assets/onboarding/onboarding3.png"),
        title: "Step-by-Step",
        description: "Each recipe is explained step by step, making cooking easier than ever. Ideal for beginners to experts alike!",
        icon: "list-alt" // FontAwesome icon name
    },
  ];

  const renderPageIndicator = () => (
    <View style={styles.pageIndicatorContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.pageIndicator,
            index === currentScreen && styles.currentPageIndicator,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable scrolling to prevent swipe conflicts with button press
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={index}
            source={slide.image}
            style={styles.backgroundImage}
            resizeMode="stretch"
          >
            <View style={styles.overlayContainer}>
              <View style={styles.slideTextContainer}>
                {index !== 0 && ( // Conditionally render back button for all slides except the first one
                  <TouchableOpacity
                    onPress={handlePrev}
                    style={styles.backButton}
                  >
                    <Text style={styles.backButtonText}>Back</Text>
                  </TouchableOpacity>
                )}
                <View style={styles.textContainer}>
                  <View style={styles.titleContainer}>
                    <Icon name={slide.icon} size={24} color="#E95322" style={styles.icon} />
                    <Text style={styles.title}>{slide.title}</Text>
                  </View>
                  <Text style={styles.description}>{slide.description}</Text>
                </View>
                {renderPageIndicator()} 
                <TouchableOpacity
                  onPress={handleNext}
                  style={[
                    styles.nextButton,
                    currentScreen === slides.length - 1 && styles.finishButton,
                  ]}
                >
                  <Text style={styles.nextButtonText}>
                    {currentScreen === slides.length - 1 ? "Get Started" : "Next"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Darker background color for text container
  },
  backgroundImage: {
    width,
    height,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end", // Align at the bottom
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
  },
  slideTextContainer: {
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#1a1a1a", // Darker background color for text container
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: "100%",
    shadowColor: "#fff", // Shadow color for text container
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#E95322", // Primary color for title
    textShadowColor: "#fff", // Text shadow color
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: "#ccc", // Light color for description text
    textAlign: "center", // Center alignment
    paddingHorizontal: 20, // Add padding horizontally
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    left: "5.3%",
    zIndex: 1,
  },
  backButtonText: {
    color: "#E95322", // Primary color for back button text
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#E95322", // Next button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    width: '40%',
    shadowColor: "#fff", // Shadow color for next button
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  pageIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
   
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#666", // Darker background color for inactive page indicator
    marginHorizontal: 4,
  },
  currentPageIndicator: {
    backgroundColor: "#E95322", // Primary color for active page indicator
  },
  icon: {
    marginRight: 8,
    marginBottom: 8,
    fontSize: 30,
  },
});
