import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ProfileType = () => {
  const navigation = useNavigation();
  const navigateToSignUp = (userType) => {
    navigation.navigate("SignUp", { userType });
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0, 1]}
      colors={["#d896ff", "#825a99"]}
      useAngle={true}
      angle={180}
    >
      <View style={styles.content}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require("./images/imageInfini.png")}
        />
        <Text style={styles.title}>Bienvenue sur Al Amal</Text>
        <Text style={styles.subtitle}>
          Choisissez le type de compte pour commencer
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToSignUp("assistant")}
        >
          <Text style={styles.buttonText}>Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigateToSignUp("patient")}
        >
          <Text style={styles.buttonText}>Famille / Patient</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#825a99",
  },
});

export default ProfileType;