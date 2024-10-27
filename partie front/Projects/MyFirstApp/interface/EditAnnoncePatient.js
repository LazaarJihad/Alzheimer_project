import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const EditAnnoncePatient = ({ route, navigation }) => {
  const [annonce, setAnnonce] = useState(route.params.annonce);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/patients/${annonce.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(annonce),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Annonce mise à jour avec succès.');
        // Navigate back to the previous screen
        navigation.goBack();
        // Trigger refresh of the previous screen
        navigation.navigate('VoirAnnoncePatient', { refresh: true });
      } else {
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la mise à jour.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la mise à jour.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier l'annonce</Text>
      <TextInput
        style={styles.input}
        value={annonce.description}
        onChangeText={(text) => setAnnonce({ ...annonce, description: text })}
        placeholder="Description"
      />
      <TextInput
        style={styles.input}
        value={annonce.age}
        onChangeText={(text) => setAnnonce({ ...annonce, age: text })}
        placeholder="Age"
      />
      <TextInput
        style={styles.input}
        value={annonce.sex}
        onChangeText={(text) => setAnnonce({ ...annonce, sex: text })}
        placeholder="Sex"
      />
      <TextInput
        style={styles.input}
        value={annonce.tarif}
        onChangeText={(text) => setAnnonce({ ...annonce, tarif: text })}
        placeholder="Tarif"
      />
      <TextInput
        style={styles.input}
        value={annonce.city}
        onChangeText={(text) => setAnnonce({ ...annonce, city: text })}
        placeholder="Emplacement"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Mettre à jour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAnnoncePatient;
