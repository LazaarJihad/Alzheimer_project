import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Note = () => {
  const navigation = useNavigation();
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  useEffect(() => {
    // Fetch notes from the API when the component mounts
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8082/notes/all');
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erreur lors de la récupération des notes:', response.statusText);
          console.error('Erreur détaillée:', errorText);
          return;
        }

        const notesData = await response.json();
        setNotes(notesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteTextChange = (text) => {
    setNoteText(text);
  };

  const handleEditingNoteTextChange = (text) => {
    setEditingNoteText(text);
  };

  const handleAddNotePress = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8082/notes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteContent: noteText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur lors de l\'ajout de la note:', response.statusText);
        console.error('Erreur détaillée:', errorText);
        return;
      }

      const newNote = await response.json();
      setNotes([...notes, newNote]);
      setNoteText('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note:', error);
    }
  };

  const handleEditNote = (index) => {
    const noteToEdit = notes[index];
    setEditingNoteIndex(index);
    setEditingNoteText(noteToEdit.noteContent);
  };

  const handleSaveEditNote = async () => {
    if (editingNoteIndex === null) return;

    const noteToEdit = notes[editingNoteIndex];
    try {
      const response = await fetch(`http://10.0.2.2:8082/notes/update/${noteToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ noteContent: editingNoteText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur lors de la mise à jour de la note:', response.statusText);
        console.error('Erreur détaillée:', errorText);
        return;
      }

      const updatedNote = await response.json();
      const updatedNotes = notes.map((note, i) => (i === editingNoteIndex ? updatedNote : note));
      setNotes(updatedNotes);
      setEditingNoteIndex(null);
      setEditingNoteText('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note:', error);
    }
  };

  const handleDeleteNote = async (index) => {
    const noteToDelete = notes[index];
    try {
      const response = await fetch(`http://10.0.2.2:8082/notes/delete/${noteToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erreur lors de la suppression de la note:', response.statusText);
        console.error('Erreur détaillée:', errorText);
        return;
      }

      const updatedNotes = notes.filter((note, i) => i !== index);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes notes</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ManageTimeNote')} style={styles.arrowContainer}>
        <Image source={require('./Image/fleche.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
      <View style={styles.background}>
        <View style={styles.overlay}>
          <Text style={styles.addNoteText}>Ajouter une note</Text>
          <TextInput
            style={[styles.noteInput, { height: 100 }]}
            multiline
            placeholder="Saisissez une note ici..."
            value={noteText}
            onChangeText={handleNoteTextChange}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddNotePress}>
            <Text style={styles.addButtonLabel}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.notesContainer}>
        {notes.map((note, index) => (
          <View key={index} style={styles.note}>
            {editingNoteIndex === index ? (
              <>
                <TextInput
                  style={[styles.noteInput, { height: 100 }]}
                  multiline
                  placeholder="Modifier la note..."
                  value={editingNoteText}
                  onChangeText={handleEditingNoteTextChange}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleSaveEditNote}>
                  <Text style={styles.addButtonLabel}>Sauvegarder</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.noteText}>{note.noteContent}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => handleEditNote(index)}>
                    <Image source={require('./Image/editer.png')} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                    <Image source={require('./Image/supprimer.png')} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: -20,
      top:40,
      color: 'black',

    },
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  arrowIcon: {
    width: 30,
    height: 30,
  },
  background: {
    padding: 20,
    marginTop: 60, // Adjusted to avoid overlap with the arrow icon
  },
  overlay: {
    backgroundColor: 'rgba(216, 150, 255, 0.6)',
    borderRadius: 19,
    padding: 28,
  },
  addNoteText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  noteInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#7D4B9B',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    top:10,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',

  },
  notesContainer: {
    flex: 1,
    marginTop: 1,
    paddingHorizontal: 20,
  },
  note: {
    backgroundColor: 'rgba(216, 150, 255, 0.6)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
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

export default Note;
