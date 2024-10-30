import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/UserContext';

const CommentsScreen = ({ navigation, route }) => {
  const { idMeal } = route.params;
  const { username, comments, addComment, editComment, deleteComment } = useAuth();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      addComment(idMeal, { user: username, text: newComment });
      setNewComment('');
    }
  };

  const handleEditComment = (commentIndex, newText) => {
    editComment(idMeal, commentIndex, newText);
  };

  const handleDeleteComment = (commentIndex) => {
    deleteComment(idMeal, commentIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Ionicons name="close" size={28} color="#FF6347" />
      </TouchableOpacity>
      <Text style={styles.title}>Comments</Text>
      <ScrollView style={styles.commentsContainer}>
        {comments[idMeal] && comments[idMeal].map((comment, index) => (
          <View key={index} style={styles.comment}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentUser}>{comment.user}</Text>
              {comment.user === username && (
                <TouchableOpacity onPress={() => handleDeleteComment(index)} style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={24} color="#FF6347" />
                </TouchableOpacity>
              )}
            </View>
            <TextInput
              style={styles.commentText}
              value={comment.text}
              onChangeText={(newText) => handleEditComment(index, newText)}
              placeholder="Edit your comment..."
              placeholderTextColor="#888"
              multiline
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 20,
  },
  commentsContainer: {
    flex: 1,
  },
  comment: {
    marginBottom: 15,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#FF6347',
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
  },
  commentText: {
    fontSize: 16,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#333',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 10,
    color: '#FFF',
    backgroundColor: '#2A2A2A',
    marginRight: 10,
    minHeight: 50,
  },
  postButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CommentsScreen;
