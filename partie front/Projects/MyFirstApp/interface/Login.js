import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const route = useRoute();
  const { userType } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      if (!response.ok) {
        const responseText = await response.text();
        try {
          const errorData = JSON.parse(responseText);
          Alert.alert('Erreur', errorData.error || 'Connexion échouée. Veuillez vérifier vos identifiants.');
        } catch {
          Alert.alert('Erreur', 'Connexion échouée. Veuillez vérifier vos identifiants.');
        }
        return;
      }

      const data = await response.json();
      const { username, city, phoneNumber, id } = data;

      // Stocker l'email de l'utilisateur
      await AsyncStorage.setItem('email', email);

      navigation.navigate(userType === 'assistant' ? 'AssistantHome' : 'AcceuilPatient', {
        username,
        email,
        city,
        phoneNumber,
        id,
        userType
      });
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb5b5"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#bbb5b5"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <LinearGradient
          style={styles.gradient}
          colors={["#d896ff", "#825a99"]}
          useAngle={true}
          angle={90}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp', { userType })} style={styles.signupLink}>
        <Text>Pas de compte ? Inscrivez-vous</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  input: {
    height: 50,
    fontSize: 16,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  gradient: {
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 15,
  },
  signupLink: {
    marginTop: 20,
    color: '#825a99',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
