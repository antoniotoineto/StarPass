import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import TopBar from '../components/topBar';
import AttractionCard from '../components/attractionCard';
import { usePin } from '../context/pinCodeContext';
import { useAttractions } from '../context/attractionsContext';
import { useRouter } from 'expo-router';
import api from '../data/api';
import { useEffect } from 'react';

export default function AttractionsList() {
  const { pin } = usePin();
  const router = useRouter();
  const { attractions } = useAttractions();

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await api.get('/lista-brinquedos');
      } catch (error: any) {
        console.error('Erro ao buscar atrações:', error.message);
      }
    };

    fetchAttractions();
  }, []);


  const handleExit = async () => {
    Alert.alert(
      "Sair do parque",
      "Tem certeza que deseja sair do parque?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            try {
              const res = await api.post('/retirar-usuario', { code: pin });
              console.log(res.data)
              router.push("/");

            } catch (error: any) {
              if (error.response) {
                console.error('Erro no servidor:', error.response.data);
                console.log("Erro: ", error.response.status)
              } else {
                console.error('Erro inesperado:', error.message);
              }
            }
          },
        },
      ]
    );

  }

  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.listContainer}>
        <ScrollView>
          {attractions.map((attraction, key) => (
            <AttractionCard
              key={key}
              id={attraction.id}
              image={attraction.images[0]}
              title={attraction.name}
              subtitle={attraction.type}
              description={attraction.description}
              minimumHeight={attraction.minimumHeight}
              averageTime={attraction.averageTime}
              location={attraction.location}
              carouselImages={attraction.images}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.exitButton} onPress={() => handleExit()}>
          <Text style={styles.bottomButtonText}>Sair do parque</Text>
        </TouchableOpacity>

        <Link href='screens/queueList' asChild>
          <TouchableOpacity style={styles.queueButton}>
            <Text style={styles.bottomButtonText}>Consultar filas</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  listContainer: {
    width: '80%',
    height: 600,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 35,
    justifyContent: 'space-between',
    marginTop: 10
  },
  exitButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  queueButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#bdbdbd'
  },
  bottomButtonText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});
