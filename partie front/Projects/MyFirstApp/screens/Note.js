import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const Note = () => {
  const [activeButton, setActiveButton] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const isFocused = useFocusEffect();
  const route = useRoute();
  const { noteId,username, email, city, phoneNumber} = route.params || {};

  const { patientId } = route.params;

  useEffect(() => {
    if (isFocused) {
      fetchNotes();
    }
  }, [isFocused]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8082/notes/all');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notes :', error);
    }
  };

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const handleViewAll = () => {
    if (activeButton === 'tasks') {
      navigation.navigate('AfficherTask');
    } else if (activeButton === 'notes') {
      navigation.navigate('Note');
    }
  };

  const handleContainerPress = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  };

  const renderNotes = () => {
    return (
      <View style={[styles.contentContainer, { marginTop: 50 }]}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Toutes les Notes</Text>
          <TouchableOpacity onPress={handleViewAll}>
            <Text style={styles.viewAllText}>Voir tous</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {notes.length === 0 ? (
            <Text style={styles.noteContent}>Aucune note disponible.</Text>
          ) : (
            notes.map(note => (
              <TouchableOpacity key={note.id} style={styles.noteItem} onPress={() => handleNoteClick(note.id)}>
                <Text style={styles.noteTitle}>{note.noteContent}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    );
  };

  const handleNoteClick = (noteId) => {
    // Gérer le clic sur une note
  };

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container}>
        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <ScrollView contentContainerStyle={styles.menuContent}>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AcceuilPatient')}>
                <Image source={require('./Image/home.png')} style={styles.menuIcon} />
                <Text style={styles.menuText}>Accueil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Image source={require('./Image/annonce.png')} style={styles.menuIcon} />
                <Text style={styles.menuText}>Mes Annonces</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfilePatient')}>
                <Image source={require('./Image/profile.png')} style={styles.menuIcon} />
                <Text style={styles.menuText}>Profil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favoris')}>
                <Image source={require('./Image/favorites.png')} style={styles.menuIcon} />
                <Text style={styles.menuText}>Favoris</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ManageTimeNote')}>
                <Image source={require('./Image/tasks.png')} style={styles.menuIcon} />
                <Text style={styles.menuText}>Mes Tâches</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AnnoncePatient')}>
                <Image source={require('./Image/panier.png')} style={styles.menuIcon} />
                <Text style={styles.menuText}>Mon Panier</Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.menuItemLogout} onPress={() => navigation.navigate('Login')}>
              <Image source={require('./Image/logout.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
            <Image source={require('./Image/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gestion des notes</Text>
        </View>

        <View style={styles.mainContentContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                activeButton === 'tasks' && styles.activeButton,
              ]}
              onPress={() => handleButtonPress('tasks')}
            >
              <Text style={styles.buttonText}>Mes tâches</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                activeButton === 'notes' && styles.activeButton,
              ]}
              onPress={() => handleButtonPress('notes')}
            >
              <Text style={styles.buttonText}>Mes notes</Text>
            </TouchableOpacity>
          </View>

          {activeButton === 'tasks' && renderTasks()}
          {activeButton === 'notes' && renderNotes()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'rgba(216, 150, 255, 0.7)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  menuButton: {
    marginRight: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  mainContentContainer: {
    flex: 1,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#D8A6FF',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#7D4B9B',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  viewAllText: {
    color: '#7D4B9B',
    textDecorationLine: 'underline',
  },
  noTaskText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  taskItem: {
    borderWidth: 1,
    borderColor: '#D8A6FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitleDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDate: {
    fontSize: 16,
    color: 'gray',
  },
  taskDescription: {
    fontSize: 16,
    color: 'gray',
  },
  taskCategory: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  noteItem: {
    borderWidth: 1,
    borderColor: '#D8A6FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '75%',
    height: '100%',
    backgroundColor: 'rgba(216, 150, 255, 0.9)',
    paddingTop: 30,
    zIndex: 1,
  },
  menuContent: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
  menuItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: 'black',
    marginTop: 'auto',
  },
});

export default Note;
