import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, Alert, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from '@react-navigation/native';

const EditAnnoncePatient = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { patientId } = route.params;

    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [city, setCity] = useState("");
    const [degreeAlz, setDegreeAlz] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDateTimePickerVisible, setStartDateTimePickerVisibility] = useState(false);
    const [isEndDateTimePickerVisible, setEndDateTimePickerVisibility] = useState(false);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://10.0.2.2:8080/api/patients/${patientId}`);
                const patient = await response.json();
                setAge(patient.age);
                setSex(patient.sex);
                setCity(patient.city);
                setDegreeAlz(patient.degreeAlz);
                setPhoneNumber(patient.phoneNumber);
                setDescription(patient.description);
                setStartDate(new Date(patient.startDate));
                setEndDate(new Date(patient.endDate));
            } catch (error) {
                console.error(error);
                Alert.alert("Erreur", "Une erreur s'est produite lors du chargement des données du patient.");
            }
        };

        fetchPatientData();
    }, [patientId]);

    const handleUpdate = async () => {
        if (!age || !sex || !city || !degreeAlz || !phoneNumber || !description || !startDate || !endDate) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        const updatedPatient = {
            age,
            sex,
            city,
            degreeAlz,
            phoneNumber,
            description,
            startDate,
            endDate,
        };

        try {
            const response = await fetch(`http://10.0.2.2:8080/api/patients/${patientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPatient),
            });

            if (response.ok) {
                Alert.alert("Succès", "Annonce mise à jour avec succès.");
                navigation.navigate('AnnoncePatient');
            } else {
                Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de la mise à jour.");
        }
    };

    const showStartDateTimePicker = () => {
        setStartDateTimePickerVisibility(true);
    };

    const hideStartDateTimePicker = () => {
        setStartDateTimePickerVisibility(false);
    };

    const handleStartDateTimeConfirm = (date) => {
        setStartDate(date);
        hideStartDateTimePicker();
    };

    const showEndDateTimePicker = () => {
        setEndDateTimePickerVisibility(true);
    };

    const hideEndDateTimePicker = () => {
        setEndDateTimePickerVisibility(false);
    };

    const handleEndDateTimeConfirm = (date) => {
        setEndDate(date);
        hideEndDateTimePicker();
    };

    return (
        <View style={styles.posterAnnoncePatient}>
            <Image
                style={styles.image67Icon}
                source={require("./Image/img_3.png")}
            />

            <LinearGradient
                style={styles.posterAnnoncePatientChild}
                locations={[0, 1]}
                colors={["rgba(216, 150, 255, 0.4)", "rgba(130, 90, 153, 0.4)"]}
            />

            <TouchableOpacity onPress={() => navigation.navigate('AcceuilPatient')}>
                <Image
                    style={[styles.image26Icon, styles.iconLayout1]}
                    source={require("./Image/image-26.png")}
                />
            </TouchableOpacity>

            <View style={[styles.posterAnnoncePatientItem, styles.posterShadowBox]} />
            <Text style={[styles.posterUneAnnonce, styles.enregistrerTypo]}>
                Éditer une annonce
            </Text>

            <LinearGradient
                style={styles.rectangleLineargradient}
                locations={[0, 1]}
                colors={["#d896ff", "#825a99"]}
            />

            <TextInput
                style={[styles.textInput, styles.ageInput]}
                placeholder="Saisir votre Age"
                placeholderTextColor="#999"
                value={age}
                onChangeText={setAge}
            />

            <View style={[styles.pickerContainer, styles.sexInput]}>
                <Picker
                    selectedValue={sex}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSex(itemValue)}
                >
                    <Picker.Item label="Sélectionnez votre sexe" value="" />
                    <Picker.Item label="Homme" value="homme" />
                    <Picker.Item label="Femme" value="femme" />
                </Picker>
            </View>

            <TextInput
                style={[styles.textInput, styles.locationInput]}
                placeholder="Saisir votre Location"
                placeholderTextColor="#999"
                value={city}
                onChangeText={setCity}
            />

            <View style={[styles.pickerContainer, styles.degreeAlzInput]}>
                <Picker
                    selectedValue={degreeAlz}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDegreeAlz(itemValue)}
                >
                    <Picker.Item label="Votre degré de ALZ" value="" />
                    <Picker.Item label="Stade léger" value="stade_leger" />
                    <Picker.Item label="Stade modéré" value="stade_modere" />
                    <Picker.Item label="Stade sévère" value="stade_severe" />
                </Picker>
            </View>

            <TextInput
                style={[styles.textInput, styles.phoneNumberInput]}
                placeholder="Saisir votre Numéro de telephone"
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />

            <TouchableOpacity onPress={showStartDateTimePicker}>
                <Text style={[styles.textInput, styles.startDateInput]}>
                    {startDate ? `Date début : ${startDate.toLocaleDateString('fr-FR')} ${startDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : "Date et heure de début"}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isStartDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleStartDateTimeConfirm}
                onCancel={hideStartDateTimePicker}
            />

            <TouchableOpacity onPress={showEndDateTimePicker}>
                <Text style={[styles.dateInput, styles.endDateInput]}>
                    {endDate ? `Date fin : ${endDate.toLocaleDateString('fr-FR')} ${endDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : "Date et heure de fin"}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isEndDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleEndDateTimeConfirm}
                onCancel={hideEndDateTimePicker}
            />

            <TextInput
                style={[styles.textInput, styles.descriptionInput]}
                placeholder="Saisir une description"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity onPress={handleUpdate} style={styles.enregistrerButton}>
                <Text style={styles.enregistrerText}>Mettre à jour</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MesAnnonces')} style={styles.ajouterButton}>
                <LinearGradient
                    style={styles.ajouterGradient}
                    locations={[0, 1]}
                    colors={["#d896ff", "#825a99"]}
                >
                    <Text style={styles.ajouterText}>Retour</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    iconLayout1: {
        height: 30,
        width: 30,
        position: "absolute",
    },
    posterShadowBox: {
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    enregistrerTypo: {
        textAlign: "left",
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
        fontWeight: "700",
        position: "absolute",
    },
    textInput: {
        color: "#000000",
        borderRadius: 20,
        backgroundColor: "#ECE9E9",
        marginVertical: 5,
        paddingHorizontal: 10,
        height: 50,
        width: 298,
        left: 71,
        fontSize: 16,
    },
    ageInput: {
        top: 144,
    },
    pickerContainer: {
        borderRadius: 20,
        backgroundColor: "#ECE9E9",
        marginVertical: 5,
        paddingHorizontal: 10,
        height: 50,
        width: 298,
        left: 71,
        fontSize: 16,
    },
    sexInput: {
        top: 149,
    },
    locationInput: {
        top: 154,
    },
    degreeAlzInput: {
        top: 159,
    },
    phoneNumberInput: {
        top: 164,
    },
    descriptionInput: {
        top: 184,
        height: 80,
        textAlignVertical: 'top', // To align the text at the top for multiline input
    },
    dateInput: {
        color: "#000000",
        borderRadius: 20,
        backgroundColor: "#ECE9E9",
        marginVertical: 5,
        paddingHorizontal: 10,
        height: 50,
        width: 298,
        left: 71,
        justifyContent: 'center',
        fontSize: 16,
    },
    startDateInput: {
        top: 174,
    },
    endDateInput: {
        top: 179,
    },
    image67Icon: {
        left: 1,
        opacity: 0.8,
        height: 418,
        width: 430,
        top: -4,
        position: "absolute",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    posterAnnoncePatientChild: {
        left: 0,
        backgroundColor: "transparent",
        height: 418,
        width: 430,
        top: -4,
        position: "absolute",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    image26Icon: {
        top: 20,
        left: 12,
    },
    posterAnnoncePatientItem: {
        top: 130,
        left: 33,
        width: 354,
        height: 700,
        borderRadius: 40,
        position: "absolute",
        backgroundColor: "#FFFFFF",
    },
    posterUneAnnonce: {
        top: 55,
        left: 55,
        fontSize: 30,
        width: 315,
        height: 69,
    },
    rectangleLineargradient: {
        top: 755,
        left: 110,
        height: 44,
        width: 203,
        borderRadius: 20,
        backgroundColor: "transparent",
        position: "absolute",
    },
    enregistrerButton: {
        top: 760,
        left: 110,
        height: 44,
        width: 203,
        borderRadius: 20,
        backgroundColor: "transparent",
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
    },
    enregistrerText: {
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
        fontWeight: "700",
    },
    ajouterButton: {
        top: 820,
        left: 110,
        height: 44,
        width: 203,
        borderRadius: 20,
        backgroundColor: "transparent",
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
    },
    ajouterGradient: {
        height: 44,
        width: 203,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ajouterText: {
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
        fontWeight: "700",
    },
    posterAnnoncePatient: {
        flex: 1,
        width: "100%",
        height: 932,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
});

export default EditAnnoncePatient;
