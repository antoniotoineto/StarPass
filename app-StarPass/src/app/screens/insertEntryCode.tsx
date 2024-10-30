import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export default function GetEntryCode() {

  const [pin, setPin] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Link href="/screens/getEntryCode" style={styles.backButton}>
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
            value={pin}
            onChangeText={setPin}
            placeholder="4 dígitos"
            maxLength={4} 
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity 
          style={styles.buttonContainer}
        >
          <Link 
            style={styles.buttonText} 
            href={"/screens/atractionsList"} 
            onPress={() => console.log('Senha confirmada: ', pin)} 
          >
            Confirmar
          </Link>
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
    width: '100%',
  },
  backButton: {
    paddingStart: 5
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginStart: '19%'
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
