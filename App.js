import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import Onboarding from "./components/Onboarding/Onboarding";
import LoginPage from "./Screens/LoginPage/LoginPage";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import Profile from "./Screens/Profile/Profile";
import Favorite from "./Screens/Favorite/Favorite";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignupScreen from "./Screens/SignupScreen/SignupScreen";
import FingerPrint from "./components/Onboarding/FingerPrint";
import RepicesDetails from "./components/RepicesDetails.js/RepicesDetails";
import ChatBot from "./Screens/ChatBot/ChatBot";
import { MaterialIcons } from "@expo/vector-icons";
import CommentsScreen from "./components/CommentScreen.js/CommentsScreen";
import { AuthProvider } from "./context/UserContext";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import MyRecipes from "./components/MyRecipes/MyRecipes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [completed, setCompleted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 10000);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        {showSplash ? (
          <View style={styles.splashContainer}>
            
            <ImageBackground
              source={require("./assets/splash/Logo1.jpg")}
              style={styles.logoShapes1}
            />
          </View>
        ) : !completed ? (
          <Onboarding onComplete={handleComplete} />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeTab}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthProvider>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FingerPrint"
        component={FingerPrint}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const HomeTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Favorite") {
              iconName = "favorite";
            } else if (route.name === "ChatBot") {
              iconName = "android";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return <MaterialIcons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: "#FF6347", // Aktif sekme metin rengi
          tabBarInactiveTintColor: "#555", // Pasif sekme metin rengi
          tabBarShowLabel: false,
          // Sekme etiketlerini gösterme
          tabBarStyle: {
            backgroundColor: "#1c1c1c", // Arka plan rengi
            borderTopWidth: 0, // Üst kenar çizgisinin kalınlığı
            elevation: 10, // Android için gölge yükseltme
            shadowColor: "#000", // Gölge rengi
            shadowOpacity: 0.1, // Gölge opaklığı
            shadowRadius: 5, // Gölge yarıçapı
            shadowOffset: { width: 0, height: 2 }, // Gölge ofseti
            borderRadius: 15, // Kenar yuvarlaklığı
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ChatBot"
          component={ChatBot}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RepicesDetails"
        component={RepicesDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="MyRecipes"
        component={MyRecipes}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 logoShapes1: {
  width: '100%',      // Cover entire width of the screen
  height: '100%',     // Cover entire height of the screen
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
},
  circle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#E95322",
    position: "absolute",
    zIndex: 0,
  },
});

export default App;
