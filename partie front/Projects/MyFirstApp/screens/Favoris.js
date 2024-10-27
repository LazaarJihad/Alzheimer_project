import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { FavoritesContext } from './FavoritesContext';

const Favoris = () => {
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [assistants, setAssistants] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    fetchFavoriteAssistants();
  }, [favorites]);

  const fetchFavoriteAssistants = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/assistants");
      const allAssistants = await response.json();
      const favoriteAssistants = allAssistants.filter(assistant =>
        favorites.includes(assistant.id)
      );
      setAssistants(favoriteAssistants);
      setShowEmptyMessage(favoriteAssistants.length === 0);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de la récupération des assistants."
      );
    }
  };

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleContainerPress = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
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
      return `postée il y a ${weeks} semaines`;
    } else if (months < 12) {
      return `postée il y a ${months} mois`;
    } else {
      return `postée il y a ${years} ans`;
    }
  };

  const renderAnnonce = ({ item }) => {
    const timeDifferenceText = renderTimeDifference(item.createdAt);

    return (
      <View style={styles.annonceContainer} onStartShouldSetResponder={handleContainerPress}>
        <View style={styles.profileFavoriteContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileAssistant', {
            assistant: item
          })}>
            <Image source={require('./Image/emptyprofile.png')} style={styles.profileImage} />
          </TouchableOpacity>
          <View>
            <Text style={styles.assistantName}>{item.username}</Text>
            <Text style={styles.annonceText}>{item.description}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Image
            source={require('./Image/filledheart.png')}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
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
        <View style={styles.row}>
          <Text style={styles.difference}>{timeDifferenceText}</Text>



        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
              onPress={() => navigation.navigate('ProfilePatient')}
            >
              <Image source={require('./Image/profile.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}
              onPress={() => navigation.navigate('Favoris')}
            >
              <Image source={require('./Image/favorites.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Favoris</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}
              onPress={() => navigation.navigate('ManageTimeNote')}
            >
              <Image source={require('./Image/tasks.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Mes Tâches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}
              onPress={() => navigation.navigate('Panier')}
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
        style={styles.gradientBackground}
        locations={[0, 1]}
        colors={["rgba(216, 150, 255, 0.4)", "rgba(130, 90, 153, 0.4)"]}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
            <Image source={require('./Image/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Mes Favoris</Text>
        <FlatList
          data={assistants}
          renderItem={renderAnnonce}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={
            showEmptyMessage ? (
              <View style={styles.emptyMessageContainer}>
                <LottieView
                  source={require('./HeartAnimation.json')}
                  autoPlay
                  loop
                  style={styles.animation}
                />
                <Text style={styles.emptyMessageText}>Aucun favori trouvé.</Text>
              </View>
            ) : null
          }
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFF",
    top:-55,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  annonceContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    height: 266,
    width: 370,
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
    left: 320,
    top: -50,
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
  difference: {
    fontSize: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageText: {
    fontSize: 16,
    color: "#333",
    marginRight: 5,
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
  menuIcon: {
    width: 40,
    height: 40,
    top:-10,
    left:-160,
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
});

export default Favoris;