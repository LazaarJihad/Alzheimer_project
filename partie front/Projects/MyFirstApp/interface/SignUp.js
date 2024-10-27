import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const eyeIconImageSize = 20; // Adjust the size as needed

const SignUp = ({ navigation, route }) => {
  const [userData, setUserData] = useState({

    email: '',
    city: '',
    telephone: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {  userType } = route.params;

  const handleSignUp = async () => {
    // Check if userData is not null or undefined
    if (!userData) {
      console.error("UserData is null or undefined");
      return;
    }

    const {  email, city, telephone, password } = userData;

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    const userDataToSend = {

      email,
      city,
      telephone,
      password,
      userType,
    };

    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataToSend), // Use userDataToSend instead of userData
      });

      if (response.ok) {
        console.log('Utilisateur créé avec succès');
        navigation.navigate('Login', { userData }); // Pass userData to Login
      } else {
        const errorText = await response.text();
        console.error('Erreur:', errorText);
        Alert.alert("Erreur", errorText);
      }
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de l'inscription.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <View style={styles.inputContainer}>
        <Image source={require('./Image/user.jpg')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          placeholderTextColor="#bbb5b5"
          value={userData && userData.username}
          onChangeText={(text) => setUserData({...userData, username: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('./Image/email.jpg')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb5b5"
          keyboardType="email-address"
          value={userData && userData.email}
          onChangeText={(text) => setUserData({...userData, email: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('./Image/city.jpg')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Ville"
          placeholderTextColor="#bbb5b5"
          value={userData && userData.city}
          onChangeText={(text) => setUserData({...userData, city: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('./Image/phone.jpg')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          placeholderTextColor="#bbb5b5"
          keyboardType="phone-pad"
          value={userData && userData.telephone}
          onChangeText={(text) => setUserData({...userData, telephone: text})}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('./Image/pass.jpg')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#bbb5b5"
          secureTextEntry={!passwordVisible}
          value={userData && userData.password}
          onChangeText={(text) => setUserData({...userData, password: text})}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
          <Image source={require('./Image/eye.jpg')} style={styles.eyeIconImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('./Image/pass.jpg')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirmer mot de passe"
          placeholderTextColor="#bbb5b5"
          secureTextEntry={!confirmPasswordVisible}
          value={userData && userData.confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
          <Image source={require('./Image/eye.jpg')} style={styles.eyeIconImage} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <LinearGradient
          style={styles.gradient}
          colors={["#d896ff", "#825a99"]}
          useAngle={true}
          angle={90}
        >
          <Text style={styles.buttonText}>S'inscrire</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signupLink}>
        <Text>Déjà un compte ? Connectez-vous</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  gradient: {
    borderRadius: 25,
  },
  eyeIconImage: {
    width: eyeIconImageSize,
    height: eyeIconImageSize,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 15,
  },
  signupLink: {
    marginTop:
  20,
    color: '#825a99',
    textDecorationLine: 'underline',
  },
});

export default SignUp;