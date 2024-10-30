import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const firebaseConfig = {
  apiKey: "AIzaSyCyJakMMiEiKwFVwUHSGzGIM8oDNaF3d4M",
  authDomain: "repicemagic.firebaseapp.com",
  projectId: "repicemagic",
  storageBucket: "repicemagic.appspot.com",
  messagingSenderId: "545524448774",
  appId: "1:545524448774:web:aed3afd860178d20dc8d87"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignupScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        phoneNumber: phoneNumber,
        email: email,
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign Up error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>New Account</Text>
      <View style={styles.signupContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholderTextColor="#888"
          />
          <Text style={styles.inputLabel}>Telephone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your telephone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholderTextColor="#888"
          />
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#888"
          />
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={toggleSecureEntry} style={styles.toggleIcon}>
              <Feather
                name={secureTextEntry ? "eye" : "eye-off"}
                size={24}
                color="#E95322"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or sign up with</Text>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => console.log("Google icon pressed")}>
            <Image
              source={require("../../assets/login/GoogleIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("FingerPrint")}>
            <Image
              source={require("../../assets/login/FingerprintIcon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  headerText: {
    marginBottom: 100,
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
  signupContainer: {
    width: "100%",
    height: "75%",
    backgroundColor: "#1E1E1E",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#bbb",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    color: "#fff",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    color: "#fff",
  },
  toggleIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  button: {
    backgroundColor: "#E95322",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  orText: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    marginVertical: 5,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  loginText: {
    marginTop: 10,
    color: "#E95322",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default SignupScreen;
