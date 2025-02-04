import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView, Alert, Modal } from 'react-native';
import TopBar from '../components/topBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImagesCarousel from '../components/imagesCarousel/imagesCarousel';
import { StatusBar } from 'expo-status-bar';
import api from '../data/api';
import { usePin } from '../context/pinCodeContext';
import { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';

export default function AttractionDetailsScreen() {

  const { id, title, subtitle, description, minimumHeight, averageTime, carouselImages } = useLocalSearchParams();
  const parsedAverageTime = Number(averageTime);
  const { pin } = usePin()
  const router = useRouter();
  const [modalType, setModalType] = useState<"success" | "fail" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isQueueModalVisible, setQueueModalVisible] = useState(false);
  const [queueData, setQueueData] = useState({ people: -1, waitTime: -1 });
  const [instantBoarding, setInstantBoarding] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<number | null>(null);
  const parsedImages = carouselImages ? JSON.parse(carouselImages as string) : [];
  const iconName = subtitle === 'Insano' ? 'flash' :
    subtitle === 'Relaxante' ? 'cafe' :
      subtitle === 'Instigante' ? 'flashlight-sharp' :
        'help-circle';

  const handleQueueModal = async () => {
    try {
      const res = await api.get(`/filas/status-fila-brinquedo/${id}/out`);
      const { queueLength, estimatedTime, timeLeft } = res.data;
      (estimatedTime === 0 && timeLeft) ? setInstantBoarding(true) : setInstantBoarding(false)
      setQueueData({ people: queueLength, waitTime: estimatedTime });
      setCurrentTimer(timeLeft);
      setQueueModalVisible(true);
    } catch (error) {
      console.error('Erro ao buscar dados da fila:', error);
    }
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (isQueueModalVisible && currentTimer !== null && currentTimer > 0) {
      timerInterval = setInterval(() => {
        setCurrentTimer((prev) => {
          if (prev && prev > 0) {
            return prev - 1; 
          } else {
            if (timerInterval) clearInterval(timerInterval);
            setInstantBoarding(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isQueueModalVisible, currentTimer]);

  const handleConfirm = async () => {

    try {
      const res = await api.post('/filas/entrar-fila', { id: id, attractionName: title, userCode: pin });
      console.log(res.data.message);

      if (res.status === 200) {
        setQueueModalVisible(false);
        setModalType("success");

        setTimeout(() => {
          setModalType(null);
          router.push("/screens/queueList");
        }, 1500);
      }

    } catch (error: any) {
      if (error.response) {
        console.error('Erro ao entrar na fila:', error.response.data);

        if (error.response.status === 400 || error.response.status === 401) {
          if (error.response.data.message === "Usuário já está na fila deste brinquedo.") {
            setErrorMessage("Usuário já está na fila!");
          }
          setQueueModalVisible(false);
          setModalType("fail");

          setTimeout(() => {
            setModalType(null);
          }, 2500);
        }
      }
    }

  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ marginTop: 14 }}>
          <TopBar />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.attractionTitle}>
            <Link href="/screens/attractionsList" style={{ position: 'absolute', left: 15 }}>
              <Ionicons name="arrow-back-outline" size={30} color="black" />
            </Link>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>{title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Ionicons name={iconName} size={22} color="black" style={{ marginLeft: 5 }} />
              </View>
            </View>
          </View>

          <View style={[styles.imagesContainer]}>
            <ImagesCarousel images={parsedImages} />
          </View>

          <View>
            <Text style={{ fontSize: 30 }}>Informações</Text>
            <View style={styles.infoContainer}>
              <Text>
                <Text style={{ fontWeight: 'bold' }}>Descrição:</Text> {description}{"\n"}
                <Text style={{ fontWeight: 'bold' }}>Altura mínima:</Text> {minimumHeight}{"\n"}
                <Text style={{ fontWeight: 'bold' }}>Duração média:</Text> {`${Math.floor(parsedAverageTime / 60)}m ${parsedAverageTime % 60}s`}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 35 }}>
            <Text style={{ fontSize: 30 }}>Localização</Text>
            <View style={styles.locContainer}>
              <Image source={require('../../assets/location.png')} style={styles.image} />
            </View>
          </View>

          <TouchableOpacity onPress={() => handleQueueModal()} style={styles.entryQueueButton}>
            <Text style={{ fontSize: 25 }}>Entrar na fila</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isQueueModalVisible}
        onRequestClose={() => setQueueModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Confirmação</Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>
              Pessoas na fila: <Text style={{ fontWeight: 'bold' }}>{queueData.people}</Text>
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              Estimativa de espera: ~
              <Text style={{ fontWeight: 'bold' }}>
                {`${Math.floor(queueData.waitTime / 60)}m  ${queueData.waitTime % 60}s`}
              </Text>

            </Text>
            {instantBoarding &&
              <>
                <View style={styles.warningText}>
                  <Text>Embarque imediato</Text>
                  <Text>Tempo restante: {currentTimer !== null ? `${currentTimer}s` : "Calculando..."}</Text>
                </View>
              </>
            }
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => setQueueModalVisible(false)} style={styles.cancelButton}>
                <Text style={{ color: 'white' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleConfirm()} style={styles.confirmButton}>
                <Text style={{ color: 'white' }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalType !== null}
        onRequestClose={() => setModalType(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {errorMessage !== "" &&
              <Text style={{ color: 'red' }}>{errorMessage}</Text>
            }
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

      <StatusBar style="auto" backgroundColor='white' />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15
  },
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 50,
    alignItems: 'center',
  },
  attractionTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    maxWidth: '80%',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 28,
    alignItems: 'center',
  },
  imagesContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  slide: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
  },
  infoContainer: {
    width: '85%',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 10,
    marginTop: 6
  },
  locContainer: {
    width: '85%',
    marginTop: 6
  },
  image: {
    width: 320,
    height: 150,
    justifyContent: 'center',
    borderRadius: 10,
  },
  entryQueueButton: {
    width: '80%',
    alignItems: 'center',
    marginTop: 35,
    backgroundColor: '#cfd0d1',
    borderRadius: 10,
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
    width: 150, height: 150,
  },
  warningText: {
    backgroundColor: 'orange', padding: 7, marginBottom: 20, borderRadius: 5, flexDirection: 'column', gap: 5
  },
  buttonsContainer: {
    flexDirection: 'row', justifyContent: 'space-between', width: '70%', alignItems: 'center'
  },
  cancelButton: {
    height: 30, width: '35%', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center',
    borderRadius: 8
  },
  confirmButton: {
    height: 40, width: '45%', backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center',
    borderRadius: 8
  }
});
