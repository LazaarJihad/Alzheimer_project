import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phoneNumber,
          city,
          role: userType
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          Alert.alert('Erreur', errorData.error || 'Inscription échouée. Veuillez vérifier les informations fournies.');
        } catch {
          Alert.alert('Erreur', 'Inscription échouée. Veuillez vérifier les informations fournies.');
        }
        return;
      }

      const data = JSON.parse(responseText);

      if (data) {
        navigation.navigate('Login', { userType });
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <View style={styles.signUp}>
      <Text style={[styles.creerCompte, styles.sinscrireTypo]}>
        Créer un compte
      </Text>

      <TextInput
        style={styles.inputStyle}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#bbb5b5"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        placeholderTextColor="#bbb5b5"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Téléphone"
        placeholderTextColor="#bbb5b5"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Ville"
        placeholderTextColor="#bbb5b5"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Mot de passe"
        placeholderTextColor="#bbb5b5"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Confirmer mot de passe"
        placeholderTextColor="#bbb5b5"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient
          style={[styles.signUpInner, styles.signLayout]}
          locations={[0, 1]}
          colors={["#d896ff", "#825a99"]}
          useAngle={true}
          angle={90}
        >
          <Text style={styles.creerCompte1}>S'inscrire</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Image
        style={styles.bottomWave1Icon}
        resizeMode="cover"
        source={require("./images/BottomUp.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sinscrireTypo: {
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    position: "absolute",
  },
  vousNavezPasTypo: {
    height: 105,
    color: "#bbb5b5",
    fontSize: 20,
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    position: "absolute",
  },
  signLayout: {
    height: 63,
    width: 321,
    borderRadius: 20,
    position: "absolute",
  },
  inputStyle: {
    top: 200,
    width: 321,
    height: 63,
    borderRadius: 20,
    left: 52,
    borderWidth: 1,
    borderColor: "#bbb5b5",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    marginVertical: 10,
  },
  creerCompte: {
    top: 120,
    fontSize: 30,
    color: "#000",
    width: 300,
    height: 37,
    left: 63,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
  },
  veuillezRemplirLes: {
    top: 160,
    width: 402,
    left: 45,
    height: 105,
  },
  signUpInner: {
    top: 225,
    left: 52,
    backgroundColor: "transparent",
  },
  creerCompte1: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
  },
  bottomWave1Icon: {
    top: 0,
    left: 0,
    width: '100%',
    height: 130,
    position: "absolute",
    overflow: "hidden",
  },
  signUp: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});

export default SignUpScreen;
