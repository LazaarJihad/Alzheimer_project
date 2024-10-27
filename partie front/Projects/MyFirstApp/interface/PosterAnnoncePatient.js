import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, Alert, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';

const PosterAnnoncePatient = (props) => {
    const navigation = useNavigation();

const {
        age: defaultAge = "",
        sex: defaultSex = "",
        tarif: defaultTarif = "",
        city: defaultCity = "",
        degreeAlz: defaultDegreeAlz = "",
        phoneNumber: defaultPhoneNumber = "",
        description: defaultDescription = "",
    } = props;
    const [age, setAge] = useState(defaultAge);
    const [sex, setSex] = useState(defaultSex);
    const [tarif, setTarif] = useState(defaultTarif);
    const [city, setCity] = useState(defaultCity);
    const [degreeAlz, setDegreeAlz] = useState(defaultDegreeAlz);
    const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
    const [description, setDescription] = useState(defaultDescription);
    // rest of your component code
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleEnregistrer = async () => {
        if (!age || !sex || !tarif || !city || !degreeAlz || !phoneNumber || !description || !startDate || !endDate) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }


        const patient = {
            age,
            sex,
            tarif,
            city,
            degreeAlz,
            phoneNumber,
            description,
            startDate,
            endDate,
        };
try {
            const response = await fetch("http://10.0.2.2:8080/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patient),
            });

            if (response.ok) {
                Alert.alert("Succès", "Annonce enregistrée avec succès.");
                navigation.navigate('AnnoncePatient');
            } else {
                Alert.alert("Erreur", "Une erreur s'est produite lors de l'enregistrement.");
                setStatus("HTTP Error: " + response.status); // Set status for error
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de l'enregistrement.");
            setStatus("Network Error: " + error.message); // Set status for error
        }
    };
    const [selectedDegree, setSelectedDegree] = useState("");
    const [isStartDateTimePickerVisible, setStartDateTimePickerVisibility] = useState(false);
    const [isEndDateTimePickerVisible, setEndDateTimePickerVisibility] = useState(false);



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

      <TextInput style={[styles.age1, styles.ageLayout,styles.posterAnnoncePatientChild2,styles.textInput]} placeholder="Mon Age"value={age} onChangeText={setAge} />

      <TextInput style={[styles.sex1, styles.ageLayout,styles.posterAnnoncePatientChild2]} placeholder="Mon sex" value={sex} onChangeText={setSex}  />

      <TextInput style={[styles.tarif1, styles.ageLayout,styles.posterAnnoncePatientChild2]} placeholder=" Tarif" value={tarif} onChangeText={setTarif} />

      <TextInput style={[styles.location1, styles.ageLayout,styles.posterAnnoncePatientChild2]} placeholder="Mon Emplacement" value={location} onChangeText={setLocation} />

        <View style={[styles.degreDeAlz1, styles.ageLayout,styles.posterAnnoncePatientChild2]}>
                <Picker
                    selectedValue={degreeAlz}
                    style={styles.picker}
                    onValueChange={(itemValue) => setDegreeAlz(itemValue)}
                >
                    <Picker.Item label="Sélectionnez votre degré de ALZ" value="" />
                    <Picker.Item label="Stade léger" value="stade_leger" />
                    <Picker.Item label="Stade modéré" value="stade_modere" />
                    <Picker.Item label="Stade sévère" value="stade_severe" />
                </Picker>
        </View>
      <TextInput style={[styles.numero1, styles.ageLayout,styles.posterAnnoncePatientChild2]} placeholder="Mon Numéro de telephone" value={phoneNumber} onChangeText={setPhoneNumber}/>

      <TextInput style={[styles.description1, styles.descLayout,styles.posterAnnoncePatientChild2]} placeholder="Description"value={description} onChangeText={setDescription} />
            <TouchableOpacity onPress={handleEnregistrer}>
                <Text style={[styles.enregistrer, styles.ageLayout]}>Enregistrer</Text>
            </TouchableOpacity>
                  <TouchableOpacity onPress={showStartDateTimePicker}>
                      <Text style={[styles.date1, styles.ageLayout, styles.textInput,styles.posterAnnoncePatientChild2]}>
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
                      <Text style={[styles.date2, styles.ageLayout, styles.posterAnnoncePatientChild2]}>
                    {endDate ? `Date fin : ${endDate.toLocaleDateString('fr-FR')} ${endDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : "Date et heure de fin"}
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
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  ageLayout: {
    height: 50,
    width: 250,
  },
    descLayout: {
      height: 80,
      width: 250,
    },
  numeroTypo: {
    left: 86,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    position: "absolute",
    height: 123,
  },
    posterAnnoncePatientChild2: {
      opacity: 0.4,
      width: 298,
      left: 71,
      backgroundColor:"#ECE9E9",
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
    borderBottomRightRadius: Border.br_21xl,
    borderBottomLeftRadius: Border.br_21xl,
  },
  posterAnnoncePatientChild: {
    left: 0,
    backgroundColor: "transparent",
    height: 418,
    width: 430,
    top: -4,
    position: "absolute",
    borderBottomLeftRadius: Border.br_21xl,
    borderBottomRightRadius: Border.br_21xl,
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
    borderRadius: Border.br_21xl,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 16,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: Color.colorWhite,
  },
  posterUneAnnonce: {
    top: 55,
    left: 55,
    fontSize: FontSize.size_11xl,
    width: 315,
    height: 69,
  },
  rectangleLineargradient: {
    top: 755,
    left: 110,
    height: 44,
    width: 203,
    borderRadius: Border.br_xl,
    backgroundColor: "transparent",
    position: "absolute",
  },
  age: {
    top: 150,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,

  },
    age1: {
      top: 144,
      color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
      left: 80,
      width: 130,
      textAlign: "left",
      position: "absolute",
      borderRadius: 20,

    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    label: {
      marginRight: 10,
      color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
    },
  sex: {
    top: 225,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,

  },
    sex1: {
      top: 207,

      color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
      left: 80,
      width: 130,
            borderRadius: 20,

      textAlign: "left",
      position: "absolute",
    },
  tarif: {
    top: 304,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,
  },
    tarif1: {
      top: 270,
      color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
      left: 80,
      width: 130,
      borderRadius: 20,
      textAlign: "left",
      position: "absolute",
    },
  location: {
    top: 383,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,
  },
    location1: {
      top: 333,
     color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
      left: 80,
      width: 130,
      textAlign: "left",
      position: "absolute",
      borderRadius: 20,

    },
  degreDeAlz: {
    top: 466,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,
  },
    degreDeAlz1: {
      top:396,
     color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
      left: 80,
      width: 130,
      textAlign: "left",
      position: "absolute",
      borderRadius: 20,

    },
  numero: {
    top: 544,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,
  },
    numero1: {
      top:459,
     color: Color.colorBlack,
      fontFamily: FontFamily.poppinsRegular,
      fontSize: FontSize.size_lg,
      left: 80,
      width: 130,
      textAlign: "left",
      position: "absolute",
            borderRadius: 20,

    },
  description: {
    top: 700,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,
  },

    description1: {
      top: 648,
       color: Color.colorBlack,
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_lg,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
                    borderRadius: 20,

    },


  enregistrer: {
    top: 760,
    left: 166,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    position: "absolute",
  },
  date: {
    top: 620,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
    left: 80,
    width: 130,
    textAlign: "left",
    position: "absolute",
      borderWidth: 1,
      borderRadius: 20,
  },
    date1: {
      top: 522,
       color: Color.colorBlack,
             borderRadius: 20,

        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_lg,
        left: 80,
        width: 130,
        textAlign: "left",
        position: "absolute",
    },
        date2: {
          top: 585,
           color: Color.colorBlack,
                 borderRadius: 20,

            fontFamily: FontFamily.poppinsRegular,
            fontSize: FontSize.size_lg,
            left: 80,
            width: 130,
            textAlign: "left",
            position: "absolute",
        },
    textInput: {
        color: "black",
    },

  label: {
    marginRight: 10,
    color: Color.colorBlack,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.size_lg,
  },

  posterAnnoncePatient: {
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});

export default PosterAnnoncePatient;