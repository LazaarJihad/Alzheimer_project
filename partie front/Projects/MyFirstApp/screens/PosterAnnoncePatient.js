import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, Alert, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PosterAnnoncePatient = () => {
    const navigation = useNavigation();

    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [degreeAlz, setDegreeAlz] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isStartDateTimePickerVisible, setStartDateTimePickerVisibility] = useState(false);
    const [isEndDateTimePickerVisible, setEndDateTimePickerVisibility] = useState(false);
    const [userId, setUserId] = useState(null);
    const [city, setCity] = useState("");

    useEffect(() => {
        const getUserDetails = async () => {
            const userId = await AsyncStorage.getItem('userId');
            setUserId(userId);
        };
        getUserDetails();
    }, []);

    const handleEnregistrer = async () => {
        if (!age || !sex || !degreeAlz || !phoneNumber || !description || !startDate || !endDate) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        const patientDTO = {
            age,
            sex,
            degreeAlz,
            phoneNumber,
            description,
            startDate,
            endDate,
            city,
            userId // Include user id here
        };

        try {
            const response = await fetch("http://10.0.2.2:8080/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patientDTO),
            });

            if (response.ok) {
                Alert.alert("Succès", "Annonce enregistrée avec succès.");
                navigation.navigate('AnnoncePatient', { userId }); // Navigate to AnnoncePatient with userId
            } else {
                Alert.alert("Erreur", "Une erreur s'est produite lors de l'enregistrement.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de l'enregistrement.");
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
                contentFit="cover"
                source={require("./Image/img_3.png")}
            />

            <LinearGradient
                style={styles.posterAnnoncePatientChild}
                locations={[0, 1]}
                colors={["rgba(216, 150, 255, 0.4)", "rgba(130, 90, 153, 0.4)"]}
            />
            <Image
                style={[styles.image26Icon, styles.iconLayout1]}
                contentFit="cover"
                source={require("./Image/image-26.png")}
            />
            <View style={[styles.posterAnnoncePatientItem, styles.posterShadowBox]} />
            <Text style={[styles.posterUneAnnonce, styles.enregistrerTypo]}>
                Poster une annonce
            </Text>

            <LinearGradient
                style={styles.rectangleLineargradient}
                locations={[0, 1]}
                colors={["#d896ff", "#825a99"]}
            />

            <TextInput style={[styles.age1, styles.ageLayout, styles.posterAnnoncePatientChild2, styles.textInput, styles.marginSpacing]} placeholder="   Votre Age" value={age} onChangeText={setAge} placeholderTextColor="#000000" />

            <View style={[styles.sex1, styles.ageLayout, styles.posterAnnoncePatientChild2, styles.marginSpacing]}>
                <Picker
                    selectedValue={sex}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSex(itemValue)}
                >
                    <Picker.Item label="Votre sexe" value="" />
                    <Picker.Item label="Homme" value="homme" />
                    <Picker.Item label="Femme" value="femme" />
                </Picker>
            </View>

            <View style={[styles.degreDeAlz1, styles.ageLayout, styles.posterAnnoncePatientChild2, styles.marginSpacing]}>
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

            <TextInput style={[styles.numero1, styles.ageLayout, styles.posterAnnoncePatientChild2, styles.marginSpacing]} placeholder="   Votre Numéro de téléphone" value={phoneNumber} onChangeText={setPhoneNumber} placeholderTextColor="#000000" />
            <TextInput style={[styles.location1, styles.ageLayout, styles.posterAnnoncePatientChild2, styles.marginSpacing]} placeholder="   Votre Ville" value={city} onChangeText={setCity} placeholderTextColor="#000000" />

            <TextInput style={[styles.description1, styles.descLayout, styles.posterAnnoncePatientChild2, styles.marginSpacing]} placeholder=" Description" value={description} onChangeText={setDescription} multiline={true} numberOfLines={4} placeholderTextColor="#000000" />

            <TouchableOpacity onPress={handleEnregistrer} style={styles.enregistrerButton}>
                <LinearGradient
                    style={styles.enregistrerGradient}
                    locations={[0, 1]}
                    colors={["#d896ff", "#825a99"]}
                >
                    <Text style={styles.enregistrerTypo}>Enregistrer</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={showStartDateTimePicker}>
                <Text style={[styles.date1, styles.ageLayout, styles.textInput, styles.posterAnnoncePatientChild2, styles.marginSpacing]}>
                    {startDate ?` Date début: ${startDate.toLocaleDateString('fr-FR')} ${startDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} `: "    Date et heure de début"}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isStartDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleStartDateTimeConfirm}
                onCancel={hideStartDateTimePicker}
            />

            <TouchableOpacity onPress={showEndDateTimePicker}>
                <Text style={[styles.date2, styles.ageLayout, styles.posterAnnoncePatientChild2, styles.marginSpacing]}>
                    {endDate ?` Date fin: ${endDate.toLocaleDateString('fr-FR')} ${endDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} `: "    Date et heure de fin"}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isEndDateTimePickerVisible}
                mode="datetime"
                onConfirm={handleEndDateTimeConfirm}
                onCancel={hideEndDateTimePicker}
            />
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
    },
    ageLayout: {
        height: 50,
        width: 250,
    },
    descLayout: {
        height: 80,
        width: 250,
        padding: 10, // Add padding for better visual appearance
    },
    posterAnnoncePatientChild2: {
        opacity: 0.4,
        width: 298,
        left: 60,
        backgroundColor: "#ECE9E9",
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    iconLayout: {
        height: 25,
        width: 40,
        left: 314,
        position: "absolute",
    },
    image67Icon: {
        left: 1,
        opacity: 0.8,
        height: 418,
        width: 430,
        top: -4,
        position: "absolute",
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    posterAnnoncePatientChild: {
        left: 0,
        backgroundColor: "transparent",
        height: 418,
        width: 430,
        top: -4,
        position: "absolute",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    image26Icon: {
        top: 20,
        left: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    posterAnnoncePatientItem: {
        top: 130,
        left: 30,
        width: 358,
        height: 700,
        borderRadius: 25,
        position: "absolute",
        shadowOpacity: 1,
        elevation: 16,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
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
        borderRadius: 25,
        backgroundColor: "transparent",
        position: "absolute",
    },
    age: {
        top: 150,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderWidth: 1,
        borderRadius: 20,
    },
    age1: {
        top: 144,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderRadius: 20,
    },
    sex: {
        top: 225,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderWidth: 1,
        borderRadius: 20,
    },
    sex1: {
        top: 207,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        borderRadius: 20,
        textAlign: "left",
        position: "absolute",
    },
    location: {
        top: 383,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderWidth: 1,
        borderRadius: 20,
    },
    location1: {
        top: 395,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderRadius: 20,
    },
    degreDeAlz1: {
        top: 270,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderRadius: 20,
    },
    numero1: {
        top: 333,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderRadius: 20,
    },
    description1: {
        top: 589,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderRadius: 20,
    },
    enregistrer: {
        fontSize: 20,
        textAlign: "center",
        color: "#FFFFFF",
        fontFamily: "Poppins-Bold",
        fontWeight: "700",
    },
    enregistrerButton: {
        top: 680,
        left: 110,
        height: 44,
        width: 203,
        borderRadius: 20,
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
    },
    enregistrerGradient: {
        height: 44,
        width: 203,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date1: {
        top: 390,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
        borderRadius: 20,
    },
    date2: {
        top: 460,
        color: "#000000",
        borderRadius: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 16,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
    },
    textInput: {
        color: "black",
        textAlign: "left",
    },
    posterAnnoncePatient: {
        flex: 1,
        width: "100%",
        height: 932,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    picker: {
        width: '100%',
        height: '100%',
        color: "#000000",
    },
    marginSpacing: {
        marginBottom: 6,
    },
    navigateButton: {
        top: 820,
        left: 110,
        height: 44,
        width: 203,
        borderRadius: 20,
        backgroundColor: "#d896ff",
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PosterAnnoncePatient;