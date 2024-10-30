import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const loadFavorites = async () => {
      if (username) {
        try {
          const storedFavorites = await AsyncStorage.getItem(`favorites_${username}`);
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
        } catch (error) {
          console.error('Error loading favorites: ', error);
        }
      }
    };

    const loadRecipes = async () => {
      if (username) {
        try {
          const storedRecipes = await AsyncStorage.getItem(`recipes_${username}`);
          if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
          }
        } catch (error) {
          console.error('Error loading recipes: ', error);
        }
      }
    };

    loadFavorites();
    loadRecipes();
  }, [username]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const storedComments = await AsyncStorage.getItem('comments');
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        }
      } catch (error) {
        console.error('Error loading comments: ', error);
      }
    };

    loadComments();
  }, []);

  const login = (username) => {
    setUsername(username);
  };

  const logout = () => {
    setUsername(null);
    setFavorites([]);
    setRecipes([]);
  };

  const toggleFavorite = async (recipe) => {
    try {
      let updatedFavorites;
      if (favorites.some(item => item.idMeal === recipe.idMeal)) {
        updatedFavorites = favorites.filter(item => item.idMeal !== recipe.idMeal);
      } else {
        updatedFavorites = [...favorites, recipe];
      }

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem(`favorites_${username}`, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error toggling favorite: ', error);
    }
  };

  const addRecipe = async (recipe) => {
    try {
      const updatedRecipes = [...recipes, recipe];
      setRecipes(updatedRecipes);
      await AsyncStorage.setItem(`recipes_${username}`, JSON.stringify(updatedRecipes));
    } catch (error) {
      console.error('Error adding recipe: ', error);
    }
  };

  const addComment = async (idMeal, comment) => {
    try {
      const updatedComments = { ...comments, [idMeal]: [...(comments[idMeal] || []), comment] };
      setComments(updatedComments);
      await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const editComment = async (idMeal, commentIndex, newText) => {
    try {
      const updatedComments = { ...comments };
      if (updatedComments[idMeal] && updatedComments[idMeal][commentIndex]) {
        updatedComments[idMeal][commentIndex].text = newText;
        setComments(updatedComments);
        await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));
      }
    } catch (error) {
      console.error('Error editing comment: ', error);
    }
  };

  const deleteComment = async (idMeal, commentIndex) => {
    try {
      const updatedComments = { ...comments };
      if (updatedComments[idMeal] && updatedComments[idMeal][commentIndex]) {
        updatedComments[idMeal].splice(commentIndex, 1); // Remove comment
        setComments(updatedComments);
        await AsyncStorage.setItem('comments', JSON.stringify(updatedComments));
      }
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, login, logout, favorites, toggleFavorite, recipes, addRecipe, comments, addComment, editComment, deleteComment }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
