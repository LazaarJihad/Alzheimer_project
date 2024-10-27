import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          Alert.alert('Erreur', errorData.error || 'Connexion échouée. Veuillez vérifier vos identifiants.');
        } catch {
          Alert.alert('Erreur', 'Connexion échouée. Veuillez vérifier vos identifiants.');
        }
        return;
      }

      const data = JSON.parse(responseText);

      if (data) {
        const { username, city, phoneNumber, id } = data;

        // Stocker l'email de l'utilisateur
        await AsyncStorage.setItem('email', email);

        navigation.navigate(userType === 'assistant' ? 'AcceuilAssistant' : 'AcceuilPatient', {
          username,
          email,
          city,
          phoneNumber,
          id,
          userType
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <View style={styles.signIn}>
      <Text style={[styles.seConnecter, styles.sinscrireTypo]}>Se connecter</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        placeholderTextColor="#bbb5b5"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Mot de passe"
          placeholderTextColor="#bbb5b5"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={showPassword ? require('./Image/eye.jpg') : require('./Image/eye.jpg')}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
          style={[styles.signInInner, styles.signLayout]}
          locations={[0, 1]}
          colors={["#d896ff", "#825a99"]}
          useAngle={true}
          angle={90}
        >
          <Text style={styles.seConnecter1}>Se connecter</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp', { userType })} style={styles.signupLink}>
        <Text>Pas de compte ? Inscrivez-vous</Text>
      </TouchableOpacity>
      <Image
        style={styles.bottomWave1Icon}
        resizeMode="cover"
        source={require("./images/bottomIn.png")}
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
  signLayout: {
    height: 63,
    width: 321,
    borderRadius: 20,
    position: "absolute",
    top: 280,

  },
  inputStyle: {
    width: 321,
    height: 63,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#bbb5b5",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    fontSize: 20,
    marginVertical: 10,
    alignSelf: "center",
    top:260,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: "center",
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 20,
    top:290,
  },
  eyeIcon: {
    width: 24,
    height: 24,

  },
  seConnecter: {
    top: 120,
    fontSize: 30,
    color: "#000",
    width: 350,
    height: 37,
    left: 63,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
  },
  seConnecter1: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
  },
  bottomWave1Icon: {
    top: 678,
    left: 0,
    width: 464,
    height: 130,
    position: "absolute",
    overflow: "hidden",
  },
  signIn: {
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#fff",

  },
  signInInner: {
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: 20,
    top:50,
  },
  signupLink: {
    marginTop: 20,
    color: '#825a99',
    textDecorationLine: 'underline',
    alignSelf: "center",
    top:360,
  },
});

export default LoginScreen;
