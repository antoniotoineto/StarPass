import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Entypo from '@expo/vector-icons/Entypo';
import { Link } from 'expo-router';

export default function GetEntryCode() {

  const [selectedOption, setSelectedOption] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Logo</Text>

      <Text style={styles.infoText}>Você precisará de uma senha de entrada.</Text>

      <Entypo name="login" size={50} color="black" />

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>Selecione o Guichê</Text>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
          mode='dialog'
        >
          <Picker.Item label="Guichê 1" value="1" />
          <Picker.Item label="Guichê 2" value="2" />
          <Picker.Item label="Guichê 3" value="3" />
        </Picker>
      </View>

      <Link 
        href={"/screens/insertEntryCode"} 
        onPress={() => console.log('Senha gerada para o guichê: ', selectedOption)} 
        asChild
      >
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} >Gerar senha</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 25,
    textAlign: 'center',
  },
  pickerContainer: {
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    width: 300,
  },
  buttonContainer: {
    width: 300,
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 25
  }
});
