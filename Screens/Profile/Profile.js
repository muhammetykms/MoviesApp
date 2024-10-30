
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ImageBackground, ScrollView, Animated, Easing, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/UserContext'; // Adjust the path as necessary

export default function Profile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [profileImage, setProfileImage] = useState(null);
  const { username, logout, recipes, addRecipe } = useAuth(); // Access username, logout function, recipes, and addRecipe from context

  const user = {
    name: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
    email: username,
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      console.log('Image Picker Result:', result); // Log the entire result object

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        console.log('Image URI:', uri); // Log the image URI for debugging
        setProfileImage(uri); // Correctly set the image URI
        Alert.alert('Image Selected', 'Profile image updated successfully');
      } else {
        console.log('Image selection canceled or no assets found');
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image. Please try again.');
    }
  };

  // Animation for shimmer effect
  const animatedValue = new Animated.Value(0);

  const animateShimmer = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => animateShimmer());
  };

  useEffect(() => {
    animateShimmer();
  }, []);

  useEffect(() => {
    if (route.params?.newRecipe) {
      addRecipe(route.params.newRecipe);
    }
  }, [route.params?.newRecipe]);

  // Interpolated value for shimmer effect
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 400],
  });

  const handleLogout = () => {
    logout(); // Assuming logout function clears authentication state
    navigation.navigate('Login'); // Navigate to Login screen after logout
  };

  return (
     <ImageBackground source={require('../../assets/profileBackground.png')} style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            <Animated.View style={[styles.shimmer, { transform: [{ translateX }] }]} />
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <Text style={styles.imagePlaceholderText}>Tap to select image</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]} 
            onPress={() => navigation.navigate('AddRecipe')}
          >
            <Text style={styles.buttonText}>Add Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => navigation.navigate('MyRecipes')}
          >
            <Text style={styles.buttonText}>My Recipes</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#ffff', // Darker header background

  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderWidth: 4,
    borderColor: '#E95322',
    borderRadius: 100,
    padding: 3,
    marginBottom: 20,
    position: 'relative',
  },
  shimmer: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.3,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    zIndex: 2,
  },
  imagePlaceholderText: {
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex: 2,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 150,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  infoSection: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000', // Lighter text color
    marginTop: 20,
  },
  info: {
    fontSize: 16,
    color: '#000', // White text color
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: 'darkgrey', // Primary button color
  },
  secondaryButton: {
    backgroundColor: 'darkgrey', // Secondary button color
  },
  logoutButton: {
    backgroundColor: '#dc3545', // Logout button color
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
