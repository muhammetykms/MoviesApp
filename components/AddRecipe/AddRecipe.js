import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddRecipe({ navigation }) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState('');
  const [image, setImage] = useState(null);

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const handleAddStep = () => {
    if (step) {
      setSteps([...steps, step]);
      setStep('');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddRecipe = () => {
    if (recipeName && ingredients.length && steps.length) {
      navigation.navigate('Profile', {
        newRecipe: { name: recipeName, ingredients, steps, image },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Create Recipe</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <View style={styles.imagePickerPlaceholder}>
              <MaterialIcons name="photo-camera" size={32} color="#ffffff" />
              <Text style={styles.imagePickerText}>Add Image</Text>
            </View>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          value={recipeName}
          onChangeText={setRecipeName}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Ingredients</Text>
          {ingredients.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.ingredientInput]}
              placeholder="Add Ingredient"
              value={ingredient}
              onChangeText={setIngredient}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
              <MaterialIcons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>Steps</Text>
          {steps.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.stepInput]}
              placeholder="Add Step"
              value={step}
              onChangeText={setStep}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddStep}>
              <MaterialIcons name="add" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleAddRecipe}>
          <Text style={styles.buttonText}>Save Recipe</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  imagePicker: {
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
    aspectRatio: 4 / 3,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePickerPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    color: '#ffffff',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ingredientInput: {
    flex: 1,
    marginRight: 12,
  },
  stepInput: {
    flex: 1,
    marginRight: 12,
  },
  listItem: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  listItemText: {
    color: '#ffffff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#0f4c75',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#0f4c75',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
