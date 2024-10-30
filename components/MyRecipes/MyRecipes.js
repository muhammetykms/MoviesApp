import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { useAuth } from '../../context/UserContext'; // Adjust the path as necessary
import { FontAwesome5 } from '@expo/vector-icons'; // Import icons from Expo vector icons

export default function MyRecipes() {
  const { recipes } = useAuth();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <FontAwesome5 name="carrot" size={14} color="#ffa502" />
          <Text style={styles.infoText}>{item.ingredients.length} ingredients</Text>
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome5 name="list-ul" size={14} color="#ffa502" />
          <Text style={styles.infoText}>{item.steps.length} steps</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {selectedRecipe && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
              <View style={styles.separator} />
              <Text style={styles.modalLabel}>Ingredients:</Text>
              <FlatList
                data={selectedRecipe.ingredients}
                renderItem={({ item }) => (
                  <Text style={styles.modalText}>{item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.ingredientList}
              />
              <Text style={styles.modalLabel}>Steps:</Text>
              <FlatList
                data={selectedRecipe.steps}
                renderItem={({ item }) => (
                  <Text style={styles.modalText}>{item}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#ffa502',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffa502',
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#ff4757',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  separator: {
    height: 2,
    backgroundColor: '#ffa502',
    marginVertical: 10,
  },
  ingredientList: {
    marginBottom: 20,
  },
});
