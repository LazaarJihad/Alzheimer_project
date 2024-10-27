import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { assistant, username, email, city, phoneNumber, userType, id } = route.params;

  const savePayment = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: assistant.id,
          email,
          amount: assistant.tarif,
          cardNumber,
          expiryDate,
          cvv,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save payment');
      }
    } catch (error) {
      console.error('Error saving payment:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement du paiement.');
    }
  };

  const handlePayment = async () => {
    await savePayment();
    Alert.alert('Merci pour votre paiement', 'Maintenant vous pouvez remplir les tâches et les notes que l\'assistant doit faire pour vous.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('ManageTimeNote', { assistantId: assistant.id, username, email, city, phoneNumber, userType, id }),
      },
    ]);
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0, 1]}
      colors={['#d896ff', '#825a99']}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Paiement</Text>
        <TextInput
          style={styles.input}
          placeholder="Numéro de la carte"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Date d'expiration"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          secureTextEntry
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Payer</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#825a99',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
  },
});

export default Payment;
