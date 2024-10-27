import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnnoncePatient = () => {
  const [annonces, setAnnonces] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedAnnonce, setEditedAnnonce] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    fetchAnnonces();
  }, [userId]);

  const fetchAnnonces = async () => {
    try {
      console.log(`Fetching annonces for userId: ${userId}`);
      const response = await fetch(`http://10.0.2.2:8080/api/patients?userId=${userId}`);
      const data = await response.json();
      console.log('Fetched annonces:', data);
      setAnnonces(data);
    } catch (error) {
      console.error('Error fetching annonces:', error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des annonces.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/patients/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Succès", "Annonce supprimée avec succès.");
        setAnnonces(annonces.filter((annonce) => annonce.id !== id));
      } else {
        Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la suppression.");
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
    const annonceToEdit = annonces.find(annonce => annonce.id === id);
    setEditedAnnonce(annonceToEdit);
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/patients/${id}?userId=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedAnnonce),
      });

      if (response.ok) {
        Alert.alert("Succès", "Annonce mise à jour avec succès.");
        setEditingId(null);
        fetchAnnonces();
      } else {
        Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour.");
      }
    } catch (error) {
      console.error('Error updating annonce:', error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour.");
    }
  };


  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedAnnonce({});
  };

  const handleChange = (field, value) => {
    setEditedAnnonce({
      ...editedAnnonce,
      [field]: value,
    });
  };

  const renderAnnonce = ({ item }) => {
    if (item.id === editingId) {
      return (
        <View style={styles.annonceContainer}>
          <TextInput
            style={styles.input}
            value={editedAnnonce.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          <TextInput
            style={styles.input}
            value={editedAnnonce.age.toString()}
            onChangeText={(text) => handleChange('age', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={editedAnnonce.sex}
            onChangeText={(text) => handleChange('sex', text)}
          />
          <TextInput
            style={styles.input}
            value={editedAnnonce.city}
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInput
            style={styles.input}
            value={editedAnnonce.degreeAlz}
            onChangeText={(text) => handleChange('degreeAlz', text)}
          />
          <TextInput
            style={styles.input}
            value={editedAnnonce.phoneNumber}
            onChangeText={(text) => handleChange('phoneNumber', text)}
          />
          <Text style={[styles.annonceText, styles.textStyle]}>Date de début: {new Date(editedAnnonce.startDate).toLocaleString()}</Text>
          <Text style={[styles.annonceText, styles.textStyle]}>Date de fin: {new Date(editedAnnonce.endDate).toLocaleString()}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleSaveEdit(item.id)}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelEdit}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.annonceContainer}>
        <View style={styles.profileInfo}>
          <Image source={require('./Image/emptyprofile.png')} style={styles.profileImage} />
          <View style={styles.textContainer}>
            <Text style={[styles.annonceText, styles.textStyleDesc]}>{item.description}</Text>
          </View>
        </View>
        <Text style={[styles.annonceText, styles.textStyle]}>Âge: {item.age}</Text>
        <Text style={[styles.annonceText, styles.textStyle]}>Sexe: {item.sex}</Text>
        <Text style={[styles.annonceText, styles.textStyle]}>Ville: {item.city}</Text>
        <Text style={[styles.annonceText, styles.textStyle]}>Degré d'Alzheimer: {item.degreeAlz}</Text>
        <Text style={[styles.annonceText, styles.textStyle]}>Numéro de téléphone: {item.phoneNumber}</Text>
        <Text style={[styles.annonceText, styles.textStyle]}>Date de début: {new Date(item.startDate).toLocaleString()}</Text>
        <Text style={[styles.annonceText, styles.textStyle]}>Date de fin: {new Date(item.endDate).toLocaleString()}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <Image source={require('./Image/editer.png')} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Image source={require('./Image/supprimer.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#d896ff', '#825a99']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.title}>Mes annonces</Text>
      <FlatList
        data={annonces}
        renderItem={renderAnnonce}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  annonceContainer: {
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  annonceText: {
    fontSize: 16,
    marginVertical: 2,
  },
  textStyle: {
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  textStyleDesc: {
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  input: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  saveButton: {
    color: "#007BFF",
    marginRight: 10,
  },
  cancelButton: {
    color: "#FF0000",
  },
});

export default AnnoncePatient;