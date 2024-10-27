import * as React from "react";
import { StyleSheet, View, Text,ScrollView, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

const AnnoncePatient = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleContainerPress = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  };

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const fetchAnnonces = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/patients");
      const data = await response.json();
      setAnnonces(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la récupération des annonces.");
    }
  };

  const renderAnnonce = ({ item }) => (
    <View style={styles.annonceContainer} onStartShouldSetResponder={handleContainerPress}>
      <View style={styles.profileInfo}>
        <Image source={require('./Image/emptyprofile.png')} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.annonceText}>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.annonceText,styles.textStyle}>Age: {item.age}</Text>
      <Text style={styles.annonceText,styles.textStyle}>Sex: {item.sex}</Text>
      <Text style={styles.annonceText,styles.textStyle}>Tarif: {item.tarif}</Text>
      <Text style={styles.annonceText,styles.textStyle}>Location: {item.location}</Text>
      <Text style={styles.annonceText,styles.textStyle,styles.textStyle}>Degree of ALZ: {item.degreeAlz}</Text>
      <Text style={styles.annonceText,styles.textStyle}>Phone Number: {item.phoneNumber}</Text>
      <Text style={styles.annonceText,styles.textStyle}>Start Date: {new Date(item.startDate).toLocaleString()}</Text>
      <Text style={styles.annonceText,styles.textStyle}>End Date: {new Date(item.endDate).toLocaleString()}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("EditAnnoncePatient", { annonce: item })}>
          <Image source={require('./Image/editer.png')} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Image source={require('./Image/supprimer.png')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <ScrollView contentContainerStyle={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/home.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/notifications.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/profile.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/favorites.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Favoris</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/tasks.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Mes Tâches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/notifications.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Mes Annonces</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.menuItemLogout}>
            <Image source={require('./Image/logout.png')} style={styles.menuIcon} />
            <Text style={styles.menuText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
      <LinearGradient
        style={styles.voirAnnoncePatientChild}
        locations={[0, 1]}
        colors={["rgba(216, 150, 255, 0.6)", "rgba(130, 90, 153, 0.6)"]}
      />
      <View style={styles.voirAnnoncePatientItem} />
      <Text style={[styles.assistantPopulaire2, styles.voirMesFlexBox]}>
        {`Ajouter une annonce `}
      </Text>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Image source={require('./Image/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("PosterAnnoncePatient")}>
        <Image source={require('./Image/add.png')} style={styles.imageadd} />
      </TouchableOpacity>
      <Text style={[styles.voirMes, styles.voirMesFlexBox]}>Mes annonces</Text>
      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={annonces}
          renderItem={renderAnnonce}
          keyExtractor={(item) => item.id.toString()} // Ensure id is converted to a string
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  voirMesFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  voirAnnoncePatientChild: {
    top: -30,
    left: 0,
    width: 412,
    height: 370,
    backgroundColor: "transparent",
    position: "absolute",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  voirAnnoncePatientItem: {
    top: 190,
    left: 20,
    width: 370,
    height: 720,
    elevation: 16,
    shadowRadius: 16,
    position: "absolute",
    backgroundColor: Color.colorWhite,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  assistantPopulaire2: {
    top: 155,
    left: 70,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.montserratSemiBold,
    width: 254,
    height: 254,
    color: Color.colorBlack,
    fontWeight: "600",
    textAlign: "left",
  },
  voirMes: {
    top: 16,
    left: 89,
    fontSize: 40,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorWhite,
    width: 315,
    height: 69,
  },
  imageadd: {
    top: 120,
    left: 35,
    width: 27,
    height: 27,
    position: "absolute",
  },
  image: {
    width: 25,
    height: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 160,
    paddingBottom: 0,
  },
  flatListContainer: {
    paddingBottom: 100,
    paddingTop: 220,  // Adjust this value if needed to avoid overlapping with header
  },
  annonceContainer: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15,
    left: 25,
    width: 340,
    top: -1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  annonceText: {
    fontSize: 16,
    marginVertical: 2,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: -30,
    justifyContent: "flex-end",
  },
  textStyle: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
  textStyleDesc: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorBlack,
  },
  menuIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: -30,
    width: '60%',
    height: '100%',
    backgroundColor: '#FAF7F7',
    zIndex: 3,
    padding: 50,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  menuContent: {
    flexGrow: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default AnnoncePatient;
