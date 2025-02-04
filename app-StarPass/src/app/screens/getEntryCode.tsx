import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import api from '../data/api';


export default function GetEntryCode() {

  const [selectedOption, setSelectedOption] = useState("0");
  const [showWarning, setShowWarning] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGeneratePassword = async (gate: string) => {

    if (gate === "0" || gate === undefined || gate === null) {
      console.log("Nenhum guichê selecionado. Usuário não pode seguir.")
      setShowWarning("É necessário selecionar um dos guichês");
    } else {
      if (isGenerating) {
        setShowWarning("Aguarde")
      } else {
        setIsGenerating(true);
        setShowWarning("");
        console.log('Senha enviada para o guichê:', gate);

        try {
          const res = await api.post('guiche/codigo-entrada', { gate });
          router.push({ pathname: "/screens/insertEntryCode", params: { gate } });
        } catch (error: any) {
          if (error.response) {
            console.error('Erro no servidor:', error.response.data);
            setShowWarning("Erro inesperado na geração de senha");
          } else {
            console.error('Erro inesperado:', error.message);
            setShowWarning("Erro inesperado na geração de senha");
          }
        }
        finally {
          setIsGenerating(false);
        }
      }

    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo_StarPass_nome.png')} style={styles.image} />

      <Text style={styles.infoText}>Você precisará de uma senha de entrada.</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>Selecione o Guichê</Text>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
          mode='dialog'
        >
          <Picker.Item label="Selecione abaixo" value="0" />
          <Picker.Item label="Guichê 1" value="1" />
          <Picker.Item label="Guichê 2" value="2" />
          <Picker.Item label="Guichê 3" value="3" />
        </Picker>
      </View>

      {showWarning !== "" && (
        <Text style={styles.warningText}>
          {showWarning}
        </Text>
      )}

      <TouchableOpacity style={styles.buttonContainer} onPress={() => handleGeneratePassword(selectedOption)} >
        <Text style={styles.buttonText}>
          {isGenerating ? "Gerando..." : "Gerar senha"}
        </Text>
      </TouchableOpacity>

      <Link href="/screens/onboarding" asChild>
        <TouchableOpacity style={styles.help}>
          <Text style={{ fontSize: 25 }}>Ajuda</Text>
          <Ionicons name="help-circle-outline" size={30} color="black" />
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
  image: {
    width: 300,
    height: 180,
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
    backgroundColor: '#2cc4f6',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 25,
    color: 'white'
  },
  help: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
