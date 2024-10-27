import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const ProfileAssistant = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.nameText, styles.textCommon]}>
        Wiam EL Khammal
      </Text>
      <Text style={[styles.profileText, styles.textCommon]}>Profile</Text>
      <View style={styles.headerBackground} />
      <Image
        style={styles.profileImage}
        resizeMode="cover"
        source={require("./images/Profile.png")}
      />
      <Image
        style={styles.backArrowIcon}
        resizeMode="cover"
        source={require("./images/fleche_agauche.png")}
      />
      <Image
        style={styles.locationIcon}
        resizeMode="cover"
        source={require("./images/map-pin.png")}
      />
      <Text style={styles.locationText}>Rabat, Maroc</Text>

      <View style={[styles.infoContainer, styles.infoLayout]} />
      <Text style={[styles.infoText, styles.textCommon]}>
        Wiam EL Khammal
      </Text>
      <Image
        style={[styles.icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("./images/customer1.png")}
      />
      <View style={[styles.emailContainer, styles.infoLayout]} />
      <Text style={[styles.emailText, styles.textCommon]}>
        wiam.el-khammal@esi.ac.ma
      </Text>
      <Image
        style={[styles.icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("./images/customer1.png")}
      />
      <View style={[styles.birthdateContainer, styles.infoChildLayout]} />
      <Text style={[styles.birthdateText, styles.textCommon]}>2/04/1897</Text>
      <Image
        style={[styles.lockIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("./images/lock.png")}
      />
      <View style={[styles.alzDegreeContainer, styles.infoChildLayout]} />
      <Text style={[styles.alzDegreeText, styles.textCommon]}>Degré ALZ</Text>
      <Image
        style={[styles.lockIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("./images/lock.png")}
      />
      <View style={[styles.passwordContainer, styles.infoChildLayout]} />
      <Text style={[styles.passwordText, styles.textCommon]}>******</Text>
      <Image
        style={[styles.lockIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("./images/lock.png")}
      />
      <View style={[styles.genderContainer, styles.infoChildLayout]} />
      <Text style={[styles.genderText, styles.textCommon]}>Femme</Text>
      <Image
        style={[styles.lockIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require("./images/lock.png")}
      />
      <View style={[styles.logoutButton, styles.buttonLayout]} />
      <Text style={[styles.logoutText, styles.buttonText]}>Log out</Text>
      <View style={[styles.saveButton, styles.buttonLayout]} />
      <Text style={[styles.saveText, styles.buttonText]}>Save</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textCommon: {
    height: 43,
    width: 300,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "left",
    color: "#000",
    position: "absolute",
  },
  infoLayout: {
    height: 63,
    width: 350,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: "rgba(0, 153, 255, 0.07)",
    borderRadius: 20,
    left: 42,
    position: "absolute",
  },
  iconLayout: {
    height: 45,
    width: 45,
    left: 53,
    position: "absolute",
  },
  infoChildLayout: {
    width: 349,
    left: 43,
    height: 63,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
    backgroundColor: "rgba(0, 153, 255, 0.07)",
    borderRadius: 20,
    position: "absolute",
  },
  buttonLayout: {
    width: 170,
    top: 828,
    height: 63,
    borderRadius: 20,
    backgroundColor: "#0099ff",
    position: "absolute",
  },
  buttonText: {
    height: 32,
    width: 115,
    color: "#fff",
    fontSize: 25,
    top: 842,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    position: "absolute",
  },
  nameText: {
    top: 119,
    left: 212,
  },
  profileText: {
    top: 31,
    left: 170,
  },
  headerBackground: {
    top: 80,
    left: -68,
    borderRadius: 90,
    width: 268,
    height: 157,
    backgroundColor: "#0099ff",
    position: "absolute",
  },
  profileImage: {
    top: 102,
    left: 64,
    width: 106,
    height: 97,
    position: "absolute",
  },
  backArrowIcon: {
    top: 32,
    left: 11,
    width: 30,
    height: 30,
    position: "absolute",
  },
  locationIcon: {
    top: 154,
    left: 232,
    width: 25,
    height: 25,
    position: "absolute",
  },
  locationText: {
    top: 161,
    left: 257,
    fontSize: 15,
    fontFamily: "SpicyRice-Regular",
    textAlign: "left",
    color: "#000",
    position: "absolute",
  },
  infoContainer: {
    top: 280,
  },
  infoText: {
    top: 300,
    left: 130,
  },
  icon: {
    top: 285,
  },
  emailContainer: {
    top: 372,
  },
  emailText: {
    top: 395,
    left: 107,
  },
  birthdateContainer: {
    top: 457,
  },
  birthdateText: {
    top: 481,
  },
  lockIcon: {
    top: 466,
  },
  alzDegreeContainer: {
    top: 642,
  },
  alzDegreeText: {
    top: 666,
  },
  passwordContainer: {
    top: 727,
  },
  passwordText: {
    top: 751,
  },
  genderContainer: {
    top: 550,
  },
  genderText: {
    top: 574,
  },
  logoutButton: {
    left: 46,
  },
  logoutText: {
    left: 83,
  },
  saveButton: {
    left: 229,
  },
  saveText: {
    left: 287,
  },
  container: {
    borderRadius: 50,
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default ProfileAssistant;