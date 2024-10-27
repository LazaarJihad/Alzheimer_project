import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";

const Panier = () => {
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const reservationsData = await AsyncStorage.getItem("reservations");
      if (reservationsData !== null) {
        setReservations(JSON.parse(reservationsData));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des réservations :", error);
    }
  };

  const handlePayment = (assistant) => {
    Alert.alert("Paiement", `Vous avez payé pour ${assistant.username}.`);
    // Implement payment logic here
  };

  const renderAnnonce = ({ item }) => (
    <View style={styles.annonceContainer}>
      <View style={styles.profileFavoriteContainer}>
        <Image source={require('./Image/emptyprofile.png')} style={styles.profileImage} />
        <View>
          <Text style={styles.assistantName}>{item.username}</Text>
          <Text style={styles.annonceText}>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.annonceText}>Age: {item.age}</Text>
      <Text style={styles.annonceText}>Sexe: {item.sex}</Text>
      <Text style={styles.annonceText}>Tarif: {item.tarif}</Text>
      <Text style={styles.annonceText}>Numéro de téléphone : {item.phoneNumber}</Text>
      <Text style={styles.annonceText}>Date de début : {new Date(item.startDate).toLocaleString()}</Text>
      <Text style={styles.annonceText}>Date de fin : {new Date(item.endDate).toLocaleString()}</Text>
      <View style={styles.locationContainer}>
        <Image source={require('./Image/location.png')} style={styles.locationIcon} />
        <Text style={styles.locationText}> {item.city}</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment(item)}>
        <Text style={styles.paymentButtonText}>Payer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Panier</Text>
      <FlatList
        data={reservations}
        renderItem={renderAnnonce}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyMessageContainer}>
            <LottieView
              source={require('./panier.json')}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.emptyMessageText}>Aucun assistant réservé pour le moment.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  annonceContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileFavoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  assistantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#333",
  },
  annonceText: {
    fontSize: 16,
    color: "#333",
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#8354A3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  paymentButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  emptyMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyMessageText: {
    fontSize: 18,
    color: "#666",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Panier;
