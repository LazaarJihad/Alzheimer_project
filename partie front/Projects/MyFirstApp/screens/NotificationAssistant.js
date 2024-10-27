import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const NotificationAssistant = () => {
  const navigation = useNavigation();
  const route = useRoute();

    const { username, city, email, phoneNumber, userType, id } = route.params;
  const { tasks } = route.params;

  const handleTaskPress = (taskId) => {
    console.log('Task clicked:', taskId);
  };

  const navigateToManageTimeAssistant = () => {
    navigation.navigate('ManageTimeAssistant',{ username, city, email, phoneNumber, userType, id }); // Naviguer vers l'interface ManageTimeAssistant
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}  onPress={() => navigation.navigate('ManageTimeAssistant', { username, city, email, phoneNumber, id })}>
        <Image
          source={require('./Image/fleche.png')} // Chemin vers votre image de flèche
          style={styles.arrowImage}
        />
      </TouchableOpacity>
      <Text style={styles.header}>Notifications</Text>
      {tasks.length > 0 ? (
        <ScrollView>
          {tasks.map(task => (
            <TouchableOpacity key={task.id} style={styles.taskContainer} onPress={() => handleTaskPress(task.id)}>
              <Text style={styles.taskTitle}>{task.tache}</Text>
              <Text style={styles.taskDescription}>{task.description}</Text>
              <Text style={styles.taskCategory}>{task.categories}</Text>
              <Text style={styles.taskDateTime}>{`${task.date} - ${task.heure}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noTasksMessage}>Aucune tâche n'existe pour l'instant.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(216, 150, 255, 0.6)',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center', // Centrer le texte
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Pour placer le bouton au-dessus du contenu
  },
  arrowImage: {
    width: 30,
    height: 30,
  },
  taskContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
  taskCategory: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  taskDateTime: {
    fontSize: 14,
    color: '#999',
  },
  noTasksMessage: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NotificationAssistant;
