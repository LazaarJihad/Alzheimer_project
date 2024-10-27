import React, { useState, useEffect } from 'react';
        import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
        import { useNavigation } from '@react-navigation/native';
        import { useIsFocused } from '@react-navigation/native';

        const ManageTimeNote = () => {
          const [activeButton, setActiveButton] = useState('');
          const [isMenuVisible, setIsMenuVisible] = useState(false);
          const [notes, setNotes] = useState([]);
          const [tasks, setTasks] = useState([]);
          const navigation = useNavigation();
          const isFocused = useIsFocused();

          useEffect(() => {
            if (isFocused) {
              fetchNotes();
              fetchTasks();
            }
          }, [isFocused]);

          const fetchNotes = async () => {
            try {
              const response = await fetch('http://10.0.2.2:8082/notes/all');
              const data = await response.json();
              console.log('Notes:', data);
              setNotes(data);
            } catch (error) {
              console.error('Erreur lors de la récupération des notes :', error);
            }
          };

          const fetchTasks = async () => {
            try {
              const response = await fetch('http://10.0.2.2:8082/tasks/all');
              const data = await response.json();
              console.log('Tasks:', data);
              setTasks(data);
            } catch (error) {
              console.error('Erreur lors de la récupération des tâches :', error);
            }
          };

          const handleMenuPress = () => {
            setIsMenuVisible(!isMenuVisible);
          };

          const handleButtonPress = (button) => {
            setActiveButton(button);
            console.log('Active button:', button);
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

          const renderTasks = () => {
            const today = new Date().toISOString().split('T')[0];
            const todaysTasks = Array.isArray(tasks) ? tasks.filter(task => task.date === today) : [];

            return (
              <View style={[styles.contentContainer, { marginTop: 50 }]}>
                <View style={styles.contentHeader}>
                  <Text style={styles.contentTitle}>Tâches à réaliser </Text>
                  <TouchableOpacity onPress={handleViewAll}>
                    <Text style={styles.viewAllText}>Voir tous</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {todaysTasks.length === 0 ? (
                    <Text style={styles.noTaskText}>Aucune tâche disponible pour aujourd'hui.</Text>
                  ) : (
                    todaysTasks.map(task => (
                      <TouchableOpacity key={task.id} style={styles.taskItem} onPress={() => handleTaskClick(task.id)}>
                        <View style={styles.taskHeader}>
                          <View style={styles.taskTitleDateContainer}>
                            <Text style={styles.taskTitle}>{task.tache}</Text>
                            <Text style={styles.taskDate}>{task.date}</Text>
                          </View>
                        </View>
                        <Text style={styles.taskDescription}>{task.description}</Text>
                        <Text style={styles.taskCategory}>{task.categories}</Text>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            );
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

          const handleTaskClick = (taskId) => {
            // Gérer le clic sur une tâche
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
                    {activeButton === 'tasks' && renderTasks()}
                    {activeButton === 'notes' && renderNotes()}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
    height: 500,
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
    fontWeight: 'bold',
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
    top: 140,
    left: 11,
    width: 390,
    height: 900,
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
    top: 20,
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
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskItem: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    width: 340,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskTitleDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    flex: 1,
  },
  taskDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: 'black',
    textAlign: 'right',
  },
  noteItem: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    width: 340,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 16,
    color: 'black',
  },
  noTaskText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
    textAlign: 'center',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: -35,
    left: 6,
  },
  viewAllText: {
    fontSize: 18,
    color: '#A271BF',
    textDecorationLine: 'underline',
    top: -35,
    left: -10,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#FAF7F7',
    zIndex: 3,
    padding: 20,
  },
  menuContent: {
    flexGrow: 1,
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
  menuText: {
    fontSize: 18,
    color: 'black',
  },
});

export default ManageTimeNote;