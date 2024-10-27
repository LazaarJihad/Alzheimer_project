import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
// Ensure to place the heart.json file in an appropriate path
import StarRating from "./StarRating"; // Assuming you have a component for star rating
import { Color, FontFamily } from "../GlobalStyles";

const Favoris = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteAssistants, setFavoriteAssistants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      if (favoritesData !== null) {
        const favoriteIds = JSON.parse(favoritesData);
        setFavorites(favoriteIds);
        fetchFavoriteAssistants(favoriteIds);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des favoris :", error);
    }
  };

  const fetchFavoriteAssistants = async (favoriteIds) => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/assistants");
      const assistants = await response.json();
      const filteredAssistants = assistants.filter(assistant => favoriteIds.includes(assistant.id));
      setFavoriteAssistants(filteredAssistants);
    } catch (error) {
      console.error("Erreur lors de la récupération des assistants favoris :", error);
    }
  };

  const renderFavorite = ({ item }) => {
    const renderTimeDifference = (createdAt) => {
      if (!createdAt) {
        return 'Date de création non disponible';
      }

      const currentTime = new Date();
      const createdTime = new Date(createdAt);

      if (isNaN(createdTime.getTime())) {
        console.error('Invalid date:', createdAt);
        return 'Date de création invalide';
      }

      const timeDifference = currentTime - createdTime;
      const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes

      return "Postée il y a ${minutesDifference} minutes";
    };

    return (
      <View style={styles.annonceContainer}>
            <Image source={require('./Image/emptyprofile.png')} style={styles.profileImage} />

        <View style={styles.annonceContent}>
          <Text style={styles.assistantName}>{item.user.username}</Text>
          <Text style={styles.annonceDescription}>{item.description}</Text>
          <Text style={styles.annonceTarif}>Tarif: {item.tarif} €</Text>
          <Text style={styles.annonceAge}>Âge: {item.age}</Text>
          <Text style={styles.annonceSex}>Sexe: {item.sex}</Text>
          <Text style={styles.annonceLocation}>Location: {item.location}</Text>
          <Text style={styles.postedTime}>{renderTimeDifference(item.createdAt)}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Note:</Text>
            <StarRating rating={item.rating} count={item.ratingCount} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      {favoriteAssistants.length === 0 ? (
        <Text style={styles.noFavoritesText}>Aucun favori pour le moment</Text>
      ) : (
        <FlatList
          data={favoriteAssistants}
          renderItem={renderFavorite}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Color.primary,
    marginBottom: 15,
  },
  listContainer: {
    flexGrow: 1,
  },
  annonceContainer: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: Color.lightGray,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  annonceContent: {
    flex: 1,
  },
  assistantName: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: Color.black,
  },
  annonceDescription: {
    fontSize: 16,
    color: Color.darkGray,
    marginTop: 5,
  },
  annonceTarif: {
    fontSize: 16,
    color: Color.black,
  },
  annonceAge: {
    fontSize: 16,
    color: Color.black,
  },
  annonceSex: {
    fontSize: 16,
    color: Color.black,
  },
  annonceLocation: {
    fontSize: 16,
    color: Color.black,
  },
  postedTime: {
    fontSize: 14,
    color: Color.darkGray,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: Color.darkGray,
    marginRight: 5,
  },
  noFavoritesText: {
    fontSize: 18,
    fontFamily: FontFamily.regular,
    color: Color.darkGray,
    marginTop: 20,
    textAlign: "center",
  },
});

export default Favoris;