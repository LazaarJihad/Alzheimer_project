import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const WelcomePage = () => {
  const navigation = useNavigation(); // Utiliser useNavigation pour obtenir la fonction de navigation

  const start = () => {
    navigation.navigate("ProfileType"); // Naviguer vers la page ProfileType
  };

  return (
    <LinearGradient
      style={styles.welcomePage}
      locations={[0, 1]}
      colors={["#d896ff", "#825a99"]}
      useAngle={true}
      angle={180}
    >
      <Image
        style={styles.image73Icon}
        resizeMode="cover"
        source={require("./images/imageWelcome.png")}
      />
      <Text style={[styles.alAmal, styles.alAmalTypo]}>Al Amal</Text>
      <Text style={[styles.unisDansLa, styles.alAmalTypo]}>
        {"Unis dans la mémoire, unis dans l'espoir."}
      </Text>
      <View style={styles.welcomePageItem} />
      <Image
        style={styles.image71Icon}
        resizeMode="cover"
        source={require("./images/imageInfini.png")}
      />
      <TouchableOpacity onPress={start} style={styles.button}>
        <Text style={styles.buttonText}>C'est parti !</Text>
      </TouchableOpacity>
      <Text style={[styles.bienvenueSurAl, styles.cestPartiTypo]}>
        Bienvenue sur AL AMAL!
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  alAmalTypo: {
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    color: "#fff",
    position: "absolute",
  },
  cestPartiTypo: {
    fontSize: 25,
    position: "absolute",
  },
  image73Icon: {
    top: 250,
    left: -14,
    width: 454,
    height: 313,
    opacity: 0.69,
    position: "absolute",
  },
  alAmal: {
    top: 170,
    left: 120,
    fontSize: 50,
    width: 292,
    height: 88,
    textAlign: "left",
    color: "#fff",
  },
  unisDansLa: {
    top: 250,
    left: 52,
    fontSize: 17,
    width: 413,
    height: 76,
    textAlign: "left",
    color: "#fff",
  },
  welcomePageItem: {
    top: 114,
    left: 320,
    width: 100,
    height: 100,
    position: "absolute",
    overflow: "hidden",
  },
  image71Icon: {
    top: 25,
    left: 85,
    width: 239,
    height: 189,
    position: "absolute",
  },
  cestParti: {
    top: 730,
    left: 139,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    width: 153,
    height: 35,
    textAlign: "left",
  },
  bienvenueSurAl: {
    top: 580,
    left: 20,
    fontFamily: "ABeeZee-Regular",
    textAlign: "center",
    width: 372,
    height: 173,
    color: "#fff",
  },
  welcomePage: {
    flex: 1,
    width: "100%",
    height: 932,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  button: {
    top: 730,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    width: 170,
    alignSelf: "center",
    height:44,

  },
  buttonText: {
    color: "#825A99",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    top:0,
  },
});

export default WelcomePage;
