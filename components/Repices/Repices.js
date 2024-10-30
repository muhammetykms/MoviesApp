import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Recipes = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    if (selectedCategory) {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.strCategory}`);
        const data = await response.json();
        setRecipes(data.meals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
        setLoading(false);
      }
    }
  };

  const handlePress = (recipe) => {
    navigation.navigate('RepicesDetails', { idMeal: recipe.idMeal });
  };

  const renderRecipes = () => {
    return recipes.map((recipe) => (
      <TouchableOpacity key={recipe.idMeal} style={styles.card} onPress={() => handlePress(recipe)}>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Text style={styles.recipeName}>{recipe.strMeal}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Recipes</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6347" />
        ) : (
          <View style={styles.recipesContainer}>{renderRecipes()}</View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 10,
    color: "#FF6347",
    fontWeight: "bold",
  },
  recipesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  recipeName: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Recipes;
