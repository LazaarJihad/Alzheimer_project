import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const ManageTimeAssistant = () => {
  const [activeButton, setActiveButton] = useState('tasks');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTaskCount, setFilteredTaskCount] = useState(0);
  const [clickedTaskIds, setClickedTaskIds] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  useEffect(() => {
    if (activeButton === 'notes') {
      fetchNotes();
    } else if (activeButton === 'tasks') {
      fetchTasks();
    }
  }, [activeButton]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchLastPatientId = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/tasks/assistant/${id}/last-patient`);
      const lastPatientId = await response.json();
      return lastPatientId;
    } catch (error) {
      console.error('Error fetching last patient ID:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la récupération de l\'ID du dernier patient.');
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/notes/all');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const lastPatientId = await fetchLastPatientId();
      if (lastPatientId) {
        const response = await fetch(`http://10.0.2.2:8080/api/tasks/assistant/${id}/patient/${lastPatientId}`);
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleMenuPress = () => {
    setIsMenuVisible(!isMenuVisible);
    if (!isMenuVisible) {
      const filteredTasks = filterTasks(tasks);
      setFilteredTaskCount(filteredTasks.length);
    }
  };

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  const handleContainerPress = () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    }
  };

  const handleNotificationPress = () => {
    const filteredTasks = filterTasks(tasks);
    setIsMenuVisible(false);
    setFilteredTaskCount(filteredTasks.length);
    navigation.navigate('NotificationAssistant', { tasks: filteredTasks });
  };

  const filterTasks = (tasks) => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const fortyFiveMinutesFromNow = new Date(now.getTime() + 45 * 60 * 1000);

    return tasks.filter(task => {
      const taskDateTime = new Date(`${task.date}T${task.heure}`);
      return taskDateTime >= todayStart && taskDateTime <= fortyFiveMinutesFromNow;
    });
  };

  const handleTaskPress = (taskId) => {
    console.log('Task clicked:', taskId);
    setClickedTaskIds(prevState =>
      prevState.includes(taskId) ? prevState : [...prevState, taskId]
    );
  };

  const handleNotePress = (noteId) => {
    console.log('Note clicked:', noteId);
  };

  return (
    <View style={styles.container} onStartShouldSetResponder={handleContainerPress}>
      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <ScrollView contentContainerStyle={styles.menuContent}>
            <TouchableOpacity style={styles.menuItem}>
              <Image source={require('./Image/home.png')} style={styles.menuIcon} />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleNotificationPress}>
              <View>
                <Image source={require('./Image/notifications.png')} style={styles.menuIcon} />
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{filteredTaskCount > 0 ? filteredTaskCount : 0}</Text>
                </View>
              </View>
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

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Image source={require('./Image/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestion du temps</Text>
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
            <Text style={styles.buttonText}>Mes Notes</Text>
          </TouchableOpacity>
        </View>

        {activeButton === 'tasks' && (
          <>
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoriesTitle}>Catégories</Text>
              <View style={styles.categories}>
                <View style={styles.categoryContainer}>
                  <View style={styles.circleContainer}>
                    <Image source={require('./Image/medicament.png')} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryLabel}></Text>
                </View>
                <View style={styles.categoryContainer}>
                  <View style={styles.circleContainer}>
                    <Image source={require('./Image/repas.png')} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryLabel}></Text>
                </View>
                <View style={styles.categoryContainer}>
                  <View style={styles.circleContainer}>
                    <Image source={require('./Image/dormir.png')} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryLabel}></Text>
                </View>
                <View style={styles.categoryContainer}>
                  <View style={styles.circleContainer}>
                    <Image source={require('./Image/other.png')} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryLabel}></Text>
                </View>
              </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.contentHeader}>
                <Text style={styles.contentTitle2}>Tâches à réaliser</Text>
              </View>
              <ScrollView>
                {tasks.map(task => (
                  <View key={task.id} style={styles.taskContainer}>
                    <TouchableOpacity
                      style={[
                        styles.circle,
                        clickedTaskIds.includes(task.id) && styles.circleClicked,
                      ]}
                      onPress={() => handleTaskPress(task.id)}
                    />
                    <View style={styles.taskDetails}>
                      <Text style={styles.taskTitle}>{task.tache}</Text>
                      <Text style={styles.taskDescription}>{task.description}</Text>
                      <Text style={styles.taskCategory}>{task.categories}</Text>
                      <Text style={styles.taskDateTime}>{`${task.date} - ${task.heure}`}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}

        {activeButton === 'notes' && (
          <View style={styles.contentContainer}>
            <View style={styles.contentHeader}>
              <Text style={styles.contentTitle}>Notes d'aujourd'hui</Text>
            </View>
            <ScrollView>
              {notes.map(note => (
                <View key={note.id} style={[styles.noteContainer, styles.annonceContainer]}>
                  <Text style={styles.noteContent}>{note.noteContent}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: 'rgba(216, 150, 255, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    height: 500, // Hauteur du header
      paddingHorizontal: 20,
      top: -1,
      left: 0,
      elevation: 200,
    },
    menuButton: {
      marginRight: 20,
      top: -215,
    },
    headerTitle: {
      fontSize: 40,
      color: 'white',
      top: -170,
      left: -30,
    },
    menuIcon: {
      width: 35,
      height: 35,
      marginRight: 10,
    },
    mainContentContainer: {
      flex: 1,
      padding: 15,
      backgroundColor: 'white',
      borderRadius: 60,
      position: 'absolute',
      top: 137,
      left: 11,
      width: 390,
      height: 900,
      padding: 15,
      elevation: 200,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      top: 30,
      elevation: 500,
    },
    button: {
      flex: 1,
      backgroundColor: 'rgba(216, 150, 255, 0.6)',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    activeButton: {
      backgroundColor: '#A271BF',
    },
    categoriesContainer: {
      marginTop: 20,
      top: 0,
    },
    categoriesTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
      top: 15,
    },
    categories: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      top: 12,
    },
    categoryContainer: {
      alignItems: 'center',
      margin: 5,
    },
    categoryImage: {
      width: 67,
      height: 66,
    },
    categoryLabel: {
      fontSize: 20,
      color: 'black',
    },
    circleContainer: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(216, 150, 255, 0.6)',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
    },
    contentContainer: {
      marginTop: 3,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contentTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      top: 50,
    },
    contentTitle2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      top: 0,
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 30,
      padding: 25,
      left: -20,
      width: 340,
      top: 20,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 6,
      },
      shadowOpacity: 0.75,
      shadowRadius: 3.84,
      elevation: 10,
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(216, 150, 255, 0.6)',
      marginRight: 15,
    },
    circleClicked: {
      backgroundColor: '#A271BF',
    },
    taskDetails: {
      flex: 1,
    },
    taskTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
    },
    taskDescription: {
      fontSize: 16,
      color: '#666',
      marginBottom: 5,
    },
    taskCategory: {
      fontSize: 14,
      color: '#999',
      marginBottom: 5,
    },
    taskDateTime: {
      fontSize: 14,
      color: '#999',
    },
    noteContainer: {
      backgroundColor: '#fff',
      margin: 30,
      padding: 25,
      left: -20,
      width: 345,
      top: 40,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 6,
      },
      shadowOpacity: 0.75,
      shadowRadius: 3.84,
      elevation: 10,
    },
    noteContent: {
      fontSize: 20,
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
    badgeContainer: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: 'red',
      borderRadius: 10,
      padding: 5,
      minWidth: 20,
      minHeight: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  export default ManageTimeAssistant;
