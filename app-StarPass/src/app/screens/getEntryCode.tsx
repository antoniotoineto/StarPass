import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';


export default function GetEntryCode() {

  const [selectedOption, setSelectedOption] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();

  const handleGeneratePassword = () => {
    if (selectedOption === "0" || selectedOption === undefined) {
      console.log("Nenhum guichê selecionado. Usuário não pode seguir.") 
      setShowWarning(true);
    } else {
      setShowWarning(false);
      console.log('Senha gerada para o guichê:', selectedOption);
      router.push("/screens/insertEntryCode");
    }
  };

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
          <Picker.Item label="Selecione abaixo" value="0" />
          <Picker.Item label="Guichê 1" value="1"/>
          <Picker.Item label="Guichê 2" value="2" />
          <Picker.Item label="Guichê 3" value="3" />
        </Picker>
      </View>

      {showWarning && (
        <Text style={styles.warningText}>Selecione um dos guichês</Text>
      )}

      <TouchableOpacity style={styles.buttonContainer} onPress={handleGeneratePassword} >
        <Text style={styles.buttonText} >Gerar senha</Text>
      </TouchableOpacity>

      <Link href="/screens/onboarding" asChild>
        <TouchableOpacity style={styles.help}>
          <Text style={{fontSize: 25}}>Ajuda</Text>
          <Ionicons name="help-circle-outline" size={30} color="black"/>
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
    backgroundColor: '#fff',
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
  warningText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: 300,
    backgroundColor: '#b0b0b0',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 25
  },
  help: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
