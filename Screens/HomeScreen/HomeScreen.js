import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Recipes from "../../components/Repices/Repices";
import { useAuth } from '../../context/UserContext'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { username } = useAuth(); // Access username from context
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategory === item && styles.selectedCategory,
        ]}
        onPress={() => {
          setSelectedCategory(item);
        }}
      >
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.categoryImage}
        />
        <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
          {item.strCategory}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const handleSearch = () => {
    console.log("Search: ", searchText);
  };
  const handleProfilePress = () => {
    navigation.navigate('Profile'); // Assuming 'Profile' is the name of your profile screen in the navigator
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <TouchableOpacity onPress={handleProfilePress}>
      <Image
        source={require("../../assets/avatar.png")}
        style={styles.avatar}
      />
    </TouchableOpacity>
        <View style={styles.headerRight}>
          <Text style={styles.userName}>{username}</Text>
          <Icon name="bell" size={25} color="#FFF" style={styles.bellIcon} />
        </View>
      </View>
      <Text style={styles.mainTitle}>
        Make your own food, stay at home
      </Text>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="#AAA"
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Icon name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoryWrapper}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          keyExtractor={(item) => item.idCategory}
          renderItem={renderCategoryItem}
        />
      </View>
      <View style={styles.recipesWrapper}>
        <Recipes selectedCategory={selectedCategory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  bellIcon: {
    marginLeft: 20,
  },
  mainTitle: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 25,
    backgroundColor: "#333",
    flex: 1,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: "#FFF",
  },
  searchButton: {
    backgroundColor: "#FF6347",
    borderRadius: 25,
    padding: 10,
    marginRight: 5,
  },
  categoryWrapper: {
    height: 140,
    paddingRight:5,
    paddingLeft:15
  },
  categoryList: {
    alignItems: "center",
    
  },
  categoryContainer: {
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    height: 120,
  },
  selectedCategory: {
    backgroundColor: "#FF6347",
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  categoryText: {
    marginTop: 5,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#000",
  },
  recipesWrapper: {
    flex: 1,
   
    
  },
});

export default HomeScreen;
