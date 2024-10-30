import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const FingerPrint = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 100,
          fontSize: 25,
          color: "#F8F8F8",
          fontWeight: "bold",
        }}
      >
        Set Your Fingerprint
      </Text>
     
      <View style={styles.fingerContainer}>
        <Text style={styles.fingerprintText}>
          You must scan your fingerprint to log in.
        </Text>
        <Image
          source={require("../../assets/fingerprint/markgray.png")}
          style={styles.fingerprintImage}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.leftButton}>
            <Text style={styles.buttonText1}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightButton}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F5CB58",
  },
  fingerContainer: {
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
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
    justifyContent: "flex-start", // Dikey hizalamayı container'ın en üstüne alır
    alignItems: "center", // Yatay hizalamayı ayarlar
  },
  fingerprintImage: {
    width: 245, // Görüntü genişliği
    height: 310, // Görüntü yüksekliği
    marginTop: 40,
  },
  fingerprintText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  leftButton: {
    backgroundColor: "#FFDECF",
    paddingVertical: 10,
    paddingHorizontal: 65,
    borderRadius: 10,
    marginTop:30
  },
  rightButton: {
    backgroundColor: "#E95322",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop:30
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText1: {
    color: "#E95322",
    fontSize: 18,
  },
});

export default FingerPrint;
