import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { usePin } from '../context/pinCodeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../data/api';


export default function GetEntryCode() {

  const [boardPin, setBoardPin] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [response, setResponse] = useState(null);
  const { setPin } = usePin();
  const router = useRouter();
  const { gate } = useLocalSearchParams();


  const handleConfirmPin = async (code: string) => {
    if(boardPin === null || 
      boardPin === '' || 
      boardPin.length !== 4 || 
      !/^\d+$/.test(boardPin) ){
      console.log("Código no formato inválido. Usuário não pode seguir.") 
      setShowWarning(true);
    } else {
      console.log('Senha confirmada: ', boardPin)
      setPin(boardPin);
      setShowWarning(false);

      try {
        const res = await api.post('/validar-codigo',  {gate: gate, code: code});
        setResponse(res.data);
        console.log(response);
        router.push("/screens/attractionsList");
      } catch (error: any) {
        if (error.response) {
          console.error('Erro no servidor:', error.response.data);
        } else {
          console.error('Erro inesperado:', error.message);
        }
      }
    }
    
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Link href="/screens/getEntryCode" style={{ position: 'absolute', left: 0 }}>
            <Ionicons name="arrow-back-outline" size={30} color="black"/>
          </Link>
          <Text style={styles.logoText}>Logo</Text>
        </View>

        <Text style={styles.infoText}>Insira a senha apresentada no guichê selecionado.</Text>

        <AntDesign name="checksquare" size={50} color="black" />

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>Insira a senha</Text>
          <TextInput
            style={styles.passwordInput}
            value={boardPin}
            onChangeText={setBoardPin}
            placeholder="4 dígitos"
            maxLength={4} 
            keyboardType="numeric"
          />
        </View>

        {showWarning && (
        <Text style={styles.warningText}>Código inválido</Text>
      )}

        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleConfirmPin(boardPin)}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  passwordInput: {
    width: 300,
    height: 50,
    fontSize: 24,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    marginVertical: 10,
  },
});
