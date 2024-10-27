import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';

const AddTask = ({ navigation, route }) => {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState('');
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const { assistantId, username, email, city, phoneNumber, id } = route.params;

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTask(task.tache);
      setCategory(task.categories);
      setDate(new Date(task.date));
      const [hours, minutes] = task.heure.split(':');
      const taskTime = new Date();
      taskTime.setHours(parseInt(hours, 10));
      taskTime.setMinutes(parseInt(minutes, 10));
      setTime(taskTime);
      setDescription(task.description);
      setIsEditing(true);
      setTaskId(task.id);
    } else {
      // Réinitialiser les champs pour ajouter une nouvelle tâche
      setTask('');
      setCategory('');
      setDate(new Date());
      setTime(new Date());
      setDescription('');
      setIsEditing(false);
      setTaskId(null);
    }
  }, [route.params]);

  const handleDateClick = () => {
    setShowDateModal(true);
  };

  const handleTimeClick = () => {
    setShowTimeModal(true);
  };

  const handleCloseDateModal = () => {
    setShowDateModal(false);
  };

  const handleCloseTimeModal = () => {
    setShowTimeModal(false);
  };

  const onSubmit = async () => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:00`;

    const taskData = {
      tache: task,
      categories: category,
      description: description,
      date: formattedDate,
      heure: formattedTime,
      assistantId,
      patientId: id,  // Utilisation correcte de patientId
      completed: false,
    };

    console.log('Task Data:', taskData);

    try {
      const response = isEditing
        ? await fetch(`http://10.0.2.2:8080/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData)
          })
        : await fetch("http://10.0.2.2:8080/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData)
          });

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Error response:', responseText);
        throw new Error('Failed to add task');
      }

      Alert.alert('Succès', 'Tâche mise à jour avec succès', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('AfficherTask', { assistantId, username, email, city, phoneNumber, id }),
        },
      ]);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      Alert.alert('Erreur', 'Erreur lors de la mise à jour de la tâche. Veuillez réessayer.');
    }
  };

  return (
    <ImageBackground style={styles.backgroundImage}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.addTaskTitle}>{isEditing ? "Modifier la tâche" : "Ajouter une tâche"}</Text>

        <View style={styles.taskInputContainer}>
          <TextInput
            style={styles.taskInput}
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder="Entrez une tâche"
          />
        </View>

        <Text style={styles.categoriesTitle}>Catégorie</Text>

        <View style={styles.categoryInputContainer}>
          <Picker
            selectedValue={category}
            style={styles.categoryPicker}
            onValueChange={(itemValue) => setCategory(itemValue)}
            prompt="Choisir une catégorie"
          >
            <Picker.Item label="Médicaments" value="medicaments" />
            <Picker.Item label="Sommeil" value="sommeil" />
            <Picker.Item label="Repas" value="repas" />
            <Picker.Item label="Autre" value="autre" />
          </Picker>
        </View>

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity onPress={handleDateClick} style={styles.dateInputContainer}>
            <Text style={styles.inputLabel}>Date</Text>
            <View style={styles.dateInputWrapper}>
              <Image source={require('./Image/dat.png')} style={styles.dateIcon} />
              <TextInput
                style={styles.dateInput}
                value={date.toISOString().split('T')[0]}
                placeholder="Entrez la date"
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity onPress={handleTimeClick} style={styles.dateInputContainer}>
            <Text style={styles.inputLabel}>Heure</Text>
            <View style={styles.dateInputWrapper}>
              <Image source={require('./Image/horlo.png')} style={styles.dateIcon} />
              <TextInput
                style={styles.dateInput}
                value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                placeholder="Entrez l'heure"
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Modal visible={showDateModal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DatePicker
                date={date}
                onDateChange={(newDate) => setDate(newDate)}
                mode="date"
              />
              <TouchableOpacity onPress={handleCloseDateModal}>
                <Text>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={showTimeModal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DatePicker
                date={time}
                onDateChange={(newTime) => setTime(newTime)}
                mode="time"
              />
              <TouchableOpacity onPress={handleCloseTimeModal}>
                <Text>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <View style={styles.descriptionInputContainer}>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Entrez une description"
              multiline
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onSubmit}
        >
          <Text style={styles.addButtonText}>{isEditing ? "Modifier la tâche" : "Ajouter la tâche"}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(216, 150, 255, 0.7)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(216, 150, 255, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    top: -35,
  },
  addTaskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  taskInputContainer: {
    borderWidth: 3,
    padding: 9,
    borderRadius: 15,
    width: '80%',
    marginBottom: 20,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  taskInput: {
    fontSize: 16,
    color: 'black',
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 16,
  },
  categoryInputContainer: {
    borderWidth: 3,
    padding: 9,
    borderRadius: 15,
    width: '80%',
    marginBottom: 20,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  categoryPicker: {
    height: 50,
    width: '100%',
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    marginTop: -35,
    backgroundColor: '#A271BF',
    top: 50,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    width: '80%',
    marginBottom: 20,
  },
  dateInputContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 9,
    color: 'black',
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: 'white',
    borderWidth: 8,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
  },
  dateIcon: {
    height: 40,
    width: 40,
  },
  descriptionContainer: {
    width: '100%',
    paddingHorizontal: '10%',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionInputContainer: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 9,
  },
  descriptionInput: {
    fontSize: 20,
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(216, 150, 255, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});

export default AddTask;
