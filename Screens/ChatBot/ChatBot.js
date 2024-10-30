import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const backgroundImage = require("../../assets/chatbotBackground.jpg"); // Buradaki path, kendi projenizdeki dosya yoluna göre güncellenmeli

  const API_KEY = "AIzaSyCOi3C0XgCRXBVOsq3J8DuVtYCJsFFbyvw";

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "hello! ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text().replace(/\*\*/g, ""); // Clean the text
      console.log(text);
      showMessage({
        message: "Ask Me for Magic Recipes 🤖",
        description: text,
        type: "info",
        icon: "info",
        duration: 4000, // Increased duration for better visibility
      });
      setMessages([
        {
          text,
          user: false,
        },
      ]);
    };
    // Function call
    startChat();

    return () => {
      // Cleanup function to stop speech on unmount
      Speech.stop();
      setIsSpeaking(false);
    };
  }, []);

  const sendMessage = async () => {
    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages([...messages, userMessage]); // Add user message to the end

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = userMessage.text;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().replace(/[*\-.,]/g, ""); // Clean the text
    setMessages([...messages, userMessage, { text, user: false }]); // Add bot message to the end
    setLoading(false);
    setUserInput("");

    if (text && !isSpeaking) {
      Speech.speak(text, {
        language: "tr",
        onDone: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
      });
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      setShowStopIcon(false);
    } else if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1].text.replace(
        /[*\-.,]/g,
        ""
      ); // Clean the text
      Speech.speak(lastMessage, {
        onDone: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
        onStopped: () => {
          setIsSpeaking(false);
          setShowStopIcon(false);
        },
      });
      setIsSpeaking(true);
      setShowStopIcon(true);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    Speech.stop();
    setIsSpeaking(false);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 45}
      style={styles.container}
    >
      <LinearGradient
        colors={["#0a0a0a", "#141414", "#1e1e1e"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowHistory(true)}
            style={styles.historyButton}
          >
            <Text style={styles.historyButtonText}>History</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Magic Chat</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
            {isSpeaking ? (
              <FontAwesome name="microphone-slash" size={24} color="white" />
            ) : (
              <FontAwesome name="microphone" size={24} color="white" />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            onChangeText={setUserInput}
            value={userInput}
            onSubmitEditing={sendMessage}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.sendIcon} onPress={sendMessage}>
            <Entypo name="paper-plane" size={24} color="white" />
          </TouchableOpacity>
          {
            // Show stop icon only when speaking
            showStopIcon && (
              <TouchableOpacity style={styles.stopIcon} onPress={clearMessages}>
                <Entypo name="controller-paus" size={24} color="white" />
              </TouchableOpacity>
            )
          }
          {loading && (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={styles.loadingIndicator}
            />
          )}
        </View>
        <FlashMessage position="top" />
      </LinearGradient>

      {/* Modal for displaying message history */}
      <Modal
        visible={showHistory}
        animationType="slide"
        onRequestClose={() => setShowHistory(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View>
              {messages.map((msg, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageContainer,
                    msg.user
                      ? styles.userMessageContainer
                      : styles.botMessageContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      msg.user ? styles.userMessage : styles.botMessageText,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowHistory(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    elevation: 5,
  },
  historyButton: {
    padding: 12,
    backgroundColor: "#FF6347",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  historyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#FF6347", // Kullanıcı mesaj arka plan rengi
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#424242", // Bot mesaj arka plan rengi
  },
  messageText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff", // Varsayılan mesaj metin rengi
  },
  userMessage: {
    color: "#ffffff", // Kullanıcı mesaj metin rengi (beyaz)
  },
  botMessageText: {
    color: "#000000", // Bot mesaj metin rengi (siyah)
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
  },
  messagesContainer: {
    padding: 10,
    paddingBottom: 100,
  },
  messageContainer: {
    padding: 15,
    borderRadius: 25,
    marginVertical: 8,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },

  botMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderTopWidth: 1,
    borderTopColor: "#444",
    position: "absolute",
    bottom: 0,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 30,
    height: 50,
    color: "#fff",
    marginHorizontal: 10,
  },
  micIcon: {
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 30,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  sendIcon: {
    padding: 12,
    backgroundColor: "#FF6347",
    borderRadius: 30,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  stopIcon: {
    padding: 12,
    backgroundColor: "#e74c3c",
    borderRadius: 30,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    padding: 20,
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GeminiChat;
