import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Image
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Link } from 'expo-router';
import { usePin } from '../context/pinCodeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import api from '../data/api';


export default function GetEntryCode() {

  const [boardPin, setBoardPin] = useState('');
  const [showWarning, setShowWarning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<"success" | "fail" | null>(null);
  const { setPin } = usePin();
  const router = useRouter();
  const { gate } = useLocalSearchParams();


  const handleConfirmPin = async (code: string) => {
    if (isLoading) {
      setShowWarning("Aguarde");
    } else {
      setIsLoading(true);
      setShowWarning("");

      if (boardPin === null ||
        boardPin === '' ||
        boardPin.length !== 4 ||
        !/^\d+$/.test(boardPin)) {
        console.log("Código no formato inválido. Usuário não pode seguir.")
        setShowWarning("Código inválido");
      } else {
        console.log('Senha digitada: ', boardPin)
        setPin(boardPin);
        setShowWarning("");

        try {
          const res = await api.post('guiche/validar-codigo', { gate: gate, code: code });

          if (res.status === 200) {
            setModalType("success");

            setTimeout(() => {
              setModalType(null);
              router.push("/screens/attractionsList");
            }, 1500);

          }


        } catch (error: any) {

          if (error.response) {
            console.error('Erro no servidor:', error.response.data);
            if (error.response.status === 400 || error.response.status === 401) {
              setModalType("fail");

              setTimeout(() => {
                setModalType(null);
              }, 2500);
            }
            console.log("Erro: ", error.response.status)
          } else {
            console.error('Erro inesperado:', error.message);
          }
        } finally {
          setIsLoading(false);
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
          <Image source={require('../../assets/logo_StarPass_nome.png')} style={styles.image} />
        </View>

        <Text style={styles.infoText}>
          Copie a senha apresentada no <Text style={{ fontWeight: 'bold' }}>guichê {gate}</Text>.
        </Text>

        <Modal
          transparent={true}
          animationType="fade"
          visible={modalType !== null}
          onRequestClose={() => setModalType(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LottieView
                source={
                  modalType === "success"
                    ? require("../../assets/Check.json")
                    : require("../../assets/Fail.json")
                }
                speed={modalType === "fail" ? 0.7 : 1}
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          </View>
        </Modal>

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
          <Text style={styles.warningText}>{showWarning}</Text>
        )}

        <View style={styles.buttonsContainer}>
          <Link href={'/screens/getEntryCode'}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Link>
          <TouchableOpacity style={styles.confirmButtonContainer} onPress={() => handleConfirmPin(boardPin)}>
            <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit={true}>
              {isLoading ? "Carregando..." : "Confirmar"}
            </Text>
          </TouchableOpacity>

        </View>

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
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',

  },
  confirmButtonContainer: {
    width: 150,
    backgroundColor: '#2cc4f6',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 25,
    color: 'white'
  },
  backButtonText: {
    fontSize: 20,
    color: '#707070'
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Fundo translúcido
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
});
