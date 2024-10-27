import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Profile = ({ route, navigation }) => {
  const {  username, city, phoneNumber,email } = route.params;
    const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newCity, setNewCity] = useState(city);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [currentUsername, setCurrentUsername] = useState(username);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [currentCity, setCurrentCity] = useState(city);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(phoneNumber);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Synchronize props with local state
  useEffect(() => {
    setNewUsername(username);
    setCurrentUsername(username);
    setNewEmail(email);
    setCurrentEmail(email);
    setNewCity(city);
    setCurrentCity(city);
    setNewPhoneNumber(phoneNumber);
    setCurrentPhoneNumber(phoneNumber);
  }, [username, email, city, phoneNumber]);

 const openModal = (type) => {
   setModalType(type);
   switch (type) {
     case 'username':
       setNewUsername(currentUsername);
       break;
     case 'email':
       setNewEmail(currentEmail);
       break;
     case 'city':
       setNewCity(currentCity);
       break;
     case 'PhoneNumber':
       setNewPhoneNumber(currentPhoneNumber);
       break;
     case 'password':
       setCurrentPassword('');
       setNewPassword('');
       setConfirmNewPassword('');
       break;
   }
   setModalVisible(true);
 };

const saveChanges = async () => {
  let success = false;
  switch (modalType) {
    case 'username':
      success = await updateUserInDatabase(currentUsername, newUsername);
      if (success) {
        setCurrentUsername(newUsername);
        navigation.setParams({ username: newUsername });
      }
      break;
    case 'email':
      success = await updateEmailInDatabase(currentEmail, newEmail);
      if (success) {
        setCurrentEmail(newEmail);
        navigation.setParams({ email: newEmail });
      }
      break;
    case 'city':
      success = await updateCityInDatabase(currentCity, newCity);
      if (success) {
        setCurrentCity(newCity);
        navigation.setParams({ city: newCity });
      }
      break;
    case 'phoneNumber':
      success = await updatePhoneNumberInDatabase(currentPhoneNumber, newPhoneNumber);
      if (success) {
        setCurrentPhoneNumber(newPhoneNumber);
        navigation.setParams({ phoneNumber: newPhoneNumber });
      }
      break;
    case 'password':
      success = await changePassword();
      break;
  }
  if (success) {
    setModalVisible(false);
  }
};


  const cancelEdit = () => {
    setModalVisible(false);
  };

  const updateUserInDatabase = async (currentUsername, newUsername) => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/update-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUsername,
          newUsername,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating username:', error);
      return false;
    }
  };

  const updateEmailInDatabase = async (currentEmail, newEmail) => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/update-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentEmail,
          newEmail,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating email:', error);
      return false;
    }
  };

  const updateCityInDatabase = async (currentCity, newCity) => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/update-city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentCity,
          newCity,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating ville:', error);
      return false;
    }
  };

  const updatePhoneNumberInDatabase = async (currentPhoneNumber, newPhoneNumber) => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/update-phoneNumber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPhoneNumber,
          newPhoneNumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error('Error updating telephone:', error);
      return false;
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
const deleteAccount = async () => {
  const confirmDelete = await new Promise((resolve) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false }
    );
  });

  if (confirmDelete) {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: currentUsername }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // Effectuez d'autres actions après la suppression, par exemple, rediriger l'utilisateur
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  }
};

const changePassword = async () => {
  if (newPassword !== confirmNewPassword) {
    console.error('Les nouveaux mots de passe ne correspondent pas');
    return;
  }
  try {
    const response = await fetch('http://10.0.2.2:8080/api/users/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: currentUsername,
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      // Effectuez des actions supplémentaires, comme informer l'utilisateur
      setModalVisible(false);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
};

  return (
    <View style={styles.profile}>
      <LinearGradient
        style={styles.profileChild}
        locations={[0, 1]}
        colors={['rgba(216, 150, 255, 0.6)', 'rgba(130, 90, 153, 0.6)']}
        useAngle={true}
        angle={180}
      />

      <Text style={[styles.monProfile, styles.monProfileLayout]}>Mon profile</Text>
      <TouchableOpacity
        style={[styles.rectangleView, styles.myUserName]}
        onPress={() => openModal('username')}
      />
      <Text style={[styles.txtmyUserName, styles.styleTypo]}>Nom d'utilisateur </Text>
      <Text style={[styles.nomUtilisateur, styles.monProfileLayout]}>{currentUsername}</Text>
      <TouchableOpacity
        style={[styles.rectangleView, styles.monemail]}
        onPress={() => openModal('email')}
      />
      <Text style={[styles.txtemail, styles.styleTypo]}>Email</Text>
      <Text style={[styles.email, styles.monProfileLayout]}>{currentEmail}</Text>
      <TouchableOpacity
        style={[styles.rectangleView, styles.maVille]}
        onPress={() => openModal('city')}
      />
      <Text style={[styles.txtVille, styles.styleTypo]}>Ville</Text>
      <Text style={[styles.ville, styles.monProfileLayout]}>{currentPhoneNumber}</Text>
      <TouchableOpacity
        style={[styles.rectangleView, styles.numeroTelephone]}
        onPress={() => openModal('phoneNumber')}
      />
      <Text style={[styles.txtNumerodetelephone, styles.styleTypo]}>Numéro de téléphone</Text>
      <Text style={[styles.telephone, styles.monProfileLayout]}>{currentCity}</Text>
     <TouchableOpacity
       style={[styles.rectangleView, styles.changePassword]}
       onPress={() => openModal('password')}
     />
     <Text style={[styles.txtchangerMotdepasse, styles.styleTypo]}>Changer mot de passe</Text>

     <TouchableOpacity
       style={[styles.rectangleView, styles.supprimerCompte]}
       onPress={deleteAccount}
     />
     <Text style={[styles.txtsupprimerCompte, styles.styleTypo]}>Supprimer mon compte</Text>

      <Image

        style={styles.image110Icon}
        resizeMode="cover"
        source={require('./Image/emptyprofile.png')}
      />
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>
        {modalType === 'username' ? 'Modifier le nom' :
         modalType === 'email' ? 'Modifier l\'email' :
         modalType === 'city' ? 'Modifier la ville' :
         modalType === 'phoneNumber' ? 'Modifier le numéro de téléphone' :
         'Changer le mot de passe'}
      </Text>
      {modalType === 'password' ? (
        <>
          <TextInput
            style={styles.modalInput}
            placeholder="Mot de passe actuel"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}

          />
          <TextInput
            style={styles.modalInput}
            placeholder="Nouveau mot de passe"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Confirmer nouveau mot de passe"
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
        </>
      ) : (
        <TextInput
          style={styles.modalInput}
          value={
            modalType === 'username' ? newUsername :
            modalType === 'email' ? newEmail :
            modalType === 'city' ? newCity :
            newPhoneNumber
          }
          onChangeText={
            modalType === 'username' ? setNewUsername :
            modalType === 'email' ? setNewEmail :
            modalType === 'city' ? setNewCity :
            setNewPhoneNumber
          }
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveChanges} />
        <Button title="Cancel" onPress={cancelEdit} />
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  rectangleView: {
    opacity: 0.4,
    height: 50,
    left: 28,
    width: 333,
    position: 'absolute',
    backgroundColor: '#ece9e9',
    shadowOpacity: 1,
    elevation: 16,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 20,
  },
  iconLayout: {
    height: 41,
    width: 26,
    position: 'absolute',
  },
  styleTypo: {
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#000',
    position: 'absolute',
  },
  monProfileLayout: {
    textAlign: 'left',
    position: 'absolute',
  },
  profileChild: {
    top: -19,
    left: -10,
    width: 430,
    height: 180,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  image26Icon: {
    top: 32,
    left: 12,
    width: 30,
    height: 30,
    position: 'absolute',
  },
  myUserName: {
    top: 230,
  },
  monemail: {
    top: 320,
  },
  numeroTelephone: {
    top: 410,
  },
  maVille: {
    top: 500,
  },
  changePassword: {
    top: 570,
  },
  supprimerCompte: {
    top: 640,
  },
  politique: {
    top: 710,
  },
  image73politique: {
    top: 715,
    left: 320,
    height: 41,
    width: 26,
  },
  image73changerMotdePasse: {
    top: 575,
    left: 320,
    height: 41,
    width: 26,
  },
  image73supprimerCompte: {
    top: 645,
    left: 320,
    height: 41,
    width: 26,
  },
  txtmyUserName: {
    left: 33,
    top: 200,
  },
  txtemail: {
    top: 290,
    left: 33,
  },
  txtNumerodetelephone: {
    top: 380,
    left: 33,
  },
  txtVille: {
    top: 470,
    left: 33,
  },
  txtchangerMotdepasse: {
    top: 580,
    left: 33,
  },
  txtsupprimerCompte: {
    top: 650,
    left: 33,
  },
  txtPolitique: {
    top: 720,
    left: 33,
  },
  nomUtilisateur: {
    top: 235,
    left: 40,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  email: {
    top: 330,
    left: 40,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },

  ville: {
    top: 420,
    left: 40,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  telephone: {
    top: 510,
    left: 40,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  monProfile: {
    top: 40,
    left: 128,
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#FFF',
    fontWeight: '700',
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
  image110Icon: {
    top: 118,
    left: 173,
    width: 80,
    height: 80,
    position: 'absolute',
  },
  profile: {
    backgroundColor: '#fff',
    flex: 1,
    height: 800,
    overflow: 'hidden',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Profile;