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
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../context/UserContext'; // Adjust the path as necessary

const LoginPage = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setUsername } = useAuth(); // Access setUsername from context

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);  
      setUsername(email);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log In</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.inputContainer}>
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
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
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
  loginContainer: {
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
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
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#E95322",
    fontWeight: "bold",
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
  signUpText: {
    marginTop: 10,
    color: "#E95322",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default LoginPage;
