import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileAssistant = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { assistant, username, email, city, phoneNumber, id } = route.params;

  const handleReserve = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('email');
      if (!userEmail) {
        Alert.alert('Erreur', 'Email utilisateur non trouvé.');
        return;
      }

      const response = await fetch('http://10.0.2.2:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: assistant.id,
          userEmail: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }

      Alert.alert('Succès', 'Réservation réussie', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Payment', { assistant, username, email, city, phoneNumber, id }),
        },
      ]);
    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
      Alert.alert('Erreur', 'Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0, 1]}
      colors={['#d896ff', '#825a99']}
    >
      <View style={styles.header}>
        <Image source={{ uri: 'path_to_assistant_image' }} style={styles.image} />
        <Text style={styles.title}>{assistant.username}</Text>
        <Text style={styles.city}>{assistant.city}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{assistant.description}</Text>
        <Text style={styles.details}>Age: {assistant.age}</Text>
        <Text style={styles.details}>Sexe: {assistant.sex}</Text>
        <Text style={styles.details}>Tarif: {assistant.tarif}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleReserve}>
        <Text style={styles.buttonText}>Réserver</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  city: {
    fontSize: 16,
    color: '#ccc',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#825a99',
    fontWeight: 'bold',
  },
});

export default ProfileAssistant;
