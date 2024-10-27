import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

const AfficherTask = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const { assistantId, username, email, city, phoneNumber, id } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/tasks/assistant/${assistantId}?patientId=${id}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches", error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.tache.toLowerCase().includes(search.toLowerCase()) ||
    task.categories.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleCompletion = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    try {
      const response = await fetch(`http://10.0.2.2:8080/api/tasks/${updatedTasks[index].id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTasks[index]),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour de la tâche: ${response.status}`);
      }

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche", error);
    }
  };

  const handleEditTask = (task) => {
    navigation.navigate('AddTask', { task, assistantId, username, email, city, phoneNumber, id });
  };

  const handleDeleteTask = async (index) => {
    const taskToDelete = tasks[index];
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression de la tâche: ${response.status}`);
      }

      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ManageTimeNote', { assistantId, username, email, city, phoneNumber, id })} style={styles.arrowContainer}>
        <Image source={require('./Image/fleche.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Toutes les tâches</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher"
        />
        <Image source={require('./Image/recherche.png')} style={styles.searchIcon} />
      </View>

      <TouchableOpacity
        style={styles.addTaskTextContainer}
        onPress={() => navigation.navigate('AddTask', { assistantId, username, email, city, phoneNumber, id })}
      >
        <Image source={require('./Image/ajouter.png')} style={styles.addTaskIcon} />
        <Text style={styles.addTaskText}>Ajouter une tâche</Text>
      </TouchableOpacity>

      <ScrollView style={styles.tasksContainer}>
        {filteredTasks.map((task, index) => (
          <View
            key={index}
            style={[styles.taskItem, { backgroundColor: '#ffffff' }]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.completionButtonContainer}
                onPress={() => handleToggleCompletion(index)}
              >
                <View
                  style={[
                    styles.outerCircle,
                    { backgroundColor: task.completed ? '#7D4B9B' : '#D8A6FF' },
                  ]}
                >
                  <View style={styles.innerCircle} />
                </View>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={styles.taskText}>{task.tache}</Text>
                    <Text style={styles.taskText}>{task.categories}</Text>
                    <Text style={[styles.taskText, styles.taskDescription]}>{task.description}</Text>
                  </View>
                  <Text style={styles.taskTime}>{task.heure}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEditTask(task)}>
                    <Image source={require('./Image/editer.png')} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <Image source={require('./Image/supprimer.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'rgba(216, 150, 255, 0.6)',
  },
  title: {
    fontSize: 31,
    fontWeight: 'bold',
    marginBottom: 25,
    color: 'black',
    top: 35,
  },
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    top: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 13,
    marginLeft: -30,
    top: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  addTaskTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    top: 20,
  },
  addTaskIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    top: 10,
  },
  taskDescription: {
    color: 'gray',
  },
  addTaskText: {
    color: 'black',
    textDecorationLine: 'underline',
    top: 10,
    fontSize: 19,
  },
  tasksContainer: {
    flex: 1,
    marginBottom: 20,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  taskTime: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  completionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});

export default AfficherTask;