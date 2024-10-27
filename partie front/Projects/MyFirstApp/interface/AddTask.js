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
  const { assistantId, username, email, city, phoneNumber } = route.params;

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTask(task.tache);
      setCategory(task.categories);
      setDate(new Date(task.date));
      setTime(new Date(`1970-01-01T${task.heure}:00`));
      setDescription(task.description);
      setIsEditing(true);
      setTaskId(task.id);
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
    const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;

    const taskData = {
      tache: task,
      categories: category,
      description: description,
      date: formattedDate,
      heure: formattedTime,
      assistantId,
      patientId: 1,  // Remplacez par le patientId actuel
      completed: false,
    };

    try {
      const response = isEditing
        ? await fetch(`http://10.0.2.2:8080/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData)
          })
        : await fetch("http://10.0.2.2:8080/tasks/add", {
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

      Alert.alert('Succès', 'Tâche ajoutée avec succès', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('AfficherTask', { assistantId, username, email, city, phoneNumber }),
        },
      ]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche :', error);
      Alert.alert('Erreur', 'Erreur lors de l\'ajout de la tâche. Veuillez réessayer.');
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
                value={time.toLocaleTimeString()}
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:-190,
  },
  addTaskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  taskInputContainer: {
    borderWidth: 3,
    padding: 6,
    borderRadius: 15,
    width: '80%',
    marginBottom: 20,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  taskInput: {
    fontSize: 18,
    color: 'black',
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  categoryInputContainer: {
    borderWidth: 3,
    padding: 6,
    borderRadius: 15,
    width: '80%',
    marginBottom: 20,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  categoryPicker: {
    height: 50,
    color: 'black',
  },
  dateTimeContainer: {
    width: '80%',
    marginBottom: 20,
  },
  dateInputContainer: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  dateIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  dateInput: {
    fontSize: 16,
    color: 'black',
    flex: 1,
  },
  descriptionContainer: {
    width: '80%',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  descriptionInputContainer: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 15,
    width: '100%',
    borderColor: 'white',
    backgroundColor: 'white',
  },
  descriptionInput: {
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#42A5F5',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default AddTask;
