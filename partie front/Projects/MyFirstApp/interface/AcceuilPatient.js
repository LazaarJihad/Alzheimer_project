import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

import LinearGradient from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "./StarRating";
import LottieView from "lottie-react-native"; // Import LottieView

const AcceuilPatient = () => {
const  route =useRoute();
   const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [favorites, setFavorites] = useState([]);
const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAssistants, setFilteredAssistants] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const navigation = useNavigation();
  const username=route.params?.username ;
  const city=route.params?.city ;
   const email=route.params?.email ;
     const telephone=route.params?.telephone ;
  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleContainerPress = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  };
  const handleClassifiedPress = () => {
    setSortType("classées");
    fetchClassifiedAssistants();
    setSelectedButton("Classées"); // Change button appearance
  };
  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchClassifiedAssistants = async () => {
      try {
        const response = await fetch("http://10.0.2.2:8080/api/assistants/classified");
        const classifiedAssistants = await response.json();
        // Mettre à jour les assistants classées
        setFilteredAssistants(classifiedAssistants);
        setShowEmptyMessage(classifiedAssistants.length === 0);
      } catch (error) {
        console.error(error);
        Alert.alert(
          "Erreur",
          "Une erreur s'est produite lors de la récupération des annonces classées."
        );
      }
    };


const handleRatingChange = async (id, rating) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/assistants/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to update rating');
      }

      // Update the local state if needed

    } catch (error) {
      console.error('Error updating rating:', error.message);
      // Handle error (e.g., show error message)
    }
  };
  const handleNearbyPress = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/assistants/nearby?city=${city}`);
      const nearbyAssistants = await response.json();
      setFilteredAssistants(nearbyAssistants);
      setShowEmptyMessage(nearbyAssistants.length === 0);
      setSelectedButton("À proximité");
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des assistants à proximité.");
    }
  };

  const fetchAssistants = async () => {

    try {
      const response = await fetch("http://10.0.2.2:8080/api/assistants");
      const assistants = await response.json();
      setAssistants(assistants);
      setFilteredAssistants(assistants);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la récupération des assistants."
      );

    }

  };

  const handleRecentPress = () => {
    fetchRecentAssistants();
    setSelectedButton("Récents");
  };

  const fetchRecentAssistants = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/assistants/recent");
      const recentAssistants = await response.json();
      // Check if recentAssistants is an array before filtering
      if (Array.isArray(recentAssistants)) {
        const filteredRecentAssistants = recentAssistants.filter((assistant) => {
          const createdAt = new Date(assistant.createdAt);
          const currentTime = new Date();
          const differenceInHours = (currentTime - createdAt) / (1000 * 60 * 60);
          return differenceInHours < 24;
        });
        setFilteredAssistants(filteredRecentAssistants);
        setShowEmptyMessage(filteredRecentAssistants.length === 0);
      } else {
        console.error("Recent assistants data is not an array:", recentAssistants);
        // Handle the case where recentAssistants is not an array
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la récupération des annonces récentes."
      );
    }
  };
const loadFavorites = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem("favorites");
      if (favoritesData !== null) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des favoris :", error);
    }
  };

 const isFavorite = (id) => {
     return favorites.includes(id);
   };

  const handleFavoriteToggle = async (id) => {
    const updatedFavorites = isFavorite(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setShowEmptyMessage(false);
    setIsSearching(true); // Activer l'animation de recherche

    if (text) {
      const filtered = assistants.filter((assistant) =>
        assistant.description.toLowerCase().includes(text.toLowerCase()) ||
        assistant.city.toLowerCase().includes(text.toLowerCase()) ||
        assistant.age.toString().includes(text.toLowerCase()) ||
        assistant.sex.toLowerCase().includes(text.toLowerCase()) ||
        assistant.tarif.toString().includes(text.toLowerCase()) ||
        assistant.phoneNumber.toString().includes(text.toLowerCase()) ||
        new Date(assistant.startDate).toLocaleString().includes(text.toLowerCase()) ||
        new Date(assistant.endDate).toLocaleString().includes(text.toLowerCase())
      );
      setFilteredAssistants(filtered);
      if (filtered.length === 0) {
        setShowEmptyMessage(true);
      }
    } else {
      setFilteredAssistants(assistants);
    }

    setIsSearching(false); // Désactiver l'animation de recherche une fois la recherche terminée
  };


  const handleVoirTout = () => {
    fetchAssistants();
    setSelectedButton(null);
  };


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

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (seconds < 60) {
        return `postée il y a ${seconds} secondes`;
      } else if (minutes < 60) {
        return `postée il y a ${minutes} minutes`;
      } else if (hours < 24) {
        return `postée il y a ${hours} heures`;
      } else if (days < 7) {
        return `postée il y a ${days} jours`;
      } else if (weeks < 4) {
        return `postée il y a ${weeks} semaines `;
      } else if (months < 12) {
        return `postée il y a ${months} mois `;
      } else {
        return `postée il y a ${years} ans`;
      }
    };

    const renderAnnonce = ({ item }) => {
      console.log('Rendering item:', item);

      const timeDifferenceText = renderTimeDifference(item.createdAt);
      console.log('createdAt:', item.createdAt, 'timeDifferenceText:', timeDifferenceText);

      return (
        <View style={styles.annonceContainer} onStartShouldSetResponder={handleContainerPress}>
          <View style={styles.profileFavoriteContainer}>
            <Image source={require('./Image/emptyprofile.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.annonceText}>{item.description}</Text>
            </View>
          <TouchableOpacity onPress={() => handleFavoriteToggle(item.id)}>
            <Image
              source={isFavorite(item.id) ? require("./Image/filledheart.png") : require("./Image/emptyheart.png")}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
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

          <Text style={styles.difference}>{timeDifferenceText}</Text>
          <View style={styles.starContainer}>
            <Text style={styles.percentageText}>{item.rating.toFixed(1)} </Text>
            <StarRating rating={item.rating} count={item.ratingCount} onChange={(rating) => handleRatingChange(item.id, rating)} />
          </View>
        </View>
      );
    };



  return (
    <View style={{ flex: 1 }}>
        {/* Animation de chargement */}

                  {isMenuVisible && (
                    <View style={styles.menuContainer}>
                      <ScrollView contentContainerStyle={styles.menuContent}>
                        <TouchableOpacity style={styles.menuItem}
                                     onPress={() => navigation.navigate('AcceuilPatient')}
             >
                          <Image source={require('./Image/home.png')} style={styles.menuIcon} />
                          <Text style={styles.menuText}>Accueil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                          <Image source={require('./Image/annonce.png')} style={styles.menuIcon} />
                          <Text style={styles.menuText}>Mes Annonces</Text>
                        </TouchableOpacity>
                       <TouchableOpacity style={styles.menuItem}
                         onPress={() => navigation.navigate('ProfilePatient', { username: username, city: city, email: email, telephone: telephone })}
                       >
                         <>
                           <Image source={require('./Image/profile.png')} style={styles.menuIcon} />
                           <Text style={styles.menuText}>Profil</Text>
                         </>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.menuItem}
                         onPress={() => navigation.navigate('Favoris')}
                       >
                         <>
                           <Image source={require('./Image/favorites.png')} style={styles.menuIcon} />
                           <Text style={styles.menuText}>Favoris</Text>
                         </>
                       </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.menuItem}
                          onPress={() => navigation.navigate('ManageTimeNote')}
                        >
                          <Image source={require('./Image/tasks.png')} style={styles.menuIcon} />
                          <Text style={styles.menuText}>Mes Tâches</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}
                                     onPress={() => navigation.navigate('AnnoncePatient')}
             >
                          <Image source={require('./Image/panier.png')} style={styles.menuIcon} />
                          <Text style={styles.menuText}>Mon Panier</Text>
                        </TouchableOpacity>
                      </ScrollView>
                      <TouchableOpacity style={styles.menuItemLogout}
                                   onPress={() => navigation.navigate('Login')}
             >
                        <Image source={require('./Image/logout.png')} style={styles.menuIcon} />
                        <Text style={styles.menuText}>Déconnexion</Text>
                      </TouchableOpacity>
                    </View>
                  )}

      <LinearGradient
        style={styles.voirAssistantPourPatient}
        locations={[0, 1]}
        colors={["rgba(216, 150, 255, 0.4)", "rgba(130, 90, 153, 0.4)"]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
            <Image source={require('./Image/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
          <Text style={styles.welcomeText}>Bienvenue, {username} !</Text>

      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        <View style={styles.buttonContainer}>
<TouchableOpacity
  style={[styles.button, selectedButton === "Classées" ? styles.selectedButton : null]}
  onPress={handleClassifiedPress}
>
  <LinearGradient
    style={styles.buttonGradient}
    locations={[0, 1]}
    colors={["rgba(216, 150, 255, 0.8)", "rgba(130, 90, 153, 0.8)"]}
  >
    <Text style={styles.buttonText}>Classées</Text>
  </LinearGradient>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.button, selectedButton === "À proximité" ? styles.selectedButton : null]}
            onPress={handleNearbyPress}
>
  <LinearGradient
    style={styles.buttonGradient}
    locations={[0, 1]}
    colors={["rgba(216, 150, 255, 0.8)", "rgba(130, 90, 153, 0.8)"]}
  >
    <Text style={styles.buttonText}>À proximité</Text>
  </LinearGradient>
</TouchableOpacity>



          <TouchableOpacity
            style={[styles.button, selectedButton === "Récents" ? styles.selectedButton : null]}
            onPress={handleRecentPress}
          >
            <LinearGradient
              style={styles.buttonGradient}
              locations={[0, 1]}
              colors={["rgba(216, 150, 255, 0.8)", "rgba(130, 90, 153, 0.8)"]}
            >
              <Text style={styles.buttonText}>Récents</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("PosterAnnoncePatient")}>
            <Text style={styles.linkTextBold}>Ajouter mon annonce</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVoirTout}>
            <Text style={styles.linkText2}>Voir tout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredAssistants}
        renderItem={renderAnnonce}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
                    showEmptyMessage ? (
                      <View style={styles.emptyMessageContainer}>
                        <LottieView
                          source={require('./Search.json')} // Path to your Lottie animation JSON file
                          autoPlay
                          loop
                          style={styles.animation}
                        />
                        <Text style={styles.emptyMessageText}>Aucune annonce trouvée.</Text>
                      </View>
                    ) : null
                  }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  voirAssistantPourPatient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },


  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#FFF",
    zIndex: 1000,
    elevation: 5,
  },
  menuContent: {
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
  },
  menuItemLogout: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    paddingHorizontal: 20,
  },
  searchBar: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    top:66,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
    overflow: "hidden",
    top:80,

  },
  selectedButton: {
    borderWidth: 2,
    borderColor: "#8354A3",

  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    top:-10,
  },
  linkTextBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8354A3",
  },
  linkText2: {
    fontSize: 16,
    color: "#8354A3",
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
  heartIcon: {
    width: 20,
    height: 20,
    left:220,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  textContainer: {
    flex: 1,
  },
  annonceText: {
    fontSize: 16,
    color: "#333",
  },
  flatListContent: {

    paddingBottom: 10,
    top:30,

  },
    emptyMessageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
      welcomeText: {
        top: 29,
        left: 60,
        fontSize: 24,
        fontFamily: FontFamily.poppinsRegular,
        width: 323,
        height: 87,
        textAlign: "left",
        color: Color.colorBlack,
        position: "absolute",
      },
  emptyMessageText: {
    fontSize: 18,
    color: "#666",
  },
    difference: {
    top:19,
            fontSize: 16,
            color: "#333",
    },

  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 207,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  animationContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
      animation: {
        width: 200,
        height: 200,
      },
});

export default AcceuilPatient;