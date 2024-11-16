import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import TopBar from '../components/topBar';
import AttractionCard from '../components/attractionCard';
import attractionsData from '../data/attractions.json';
import { usePin } from '../context/pinCodeContext';
import { useRouter } from 'expo-router';


export default function AttractionsList() {
  const { pin } = usePin();
  const router = useRouter();

  const handleExit = () => {
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
          onPress: () => {
            console.log("Envia request para tirar o usuário do parque: ", {pin})
            router.push("/");

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
        {attractionsData.map((attraction, key) => (
          <AttractionCard
            key={key}
            id={attraction.id}
            image={attraction.image}
            title={attraction.title}
            subtitle={attraction.subtitle}
            description={attraction.description}
            minimumHeight={attraction.minimumHeight}
            avarageTime={attraction.avarageTime}
            location={attraction.location}
            carouselImages={attraction.carouselImages}
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
  bottomButtonText:{
    fontSize: 15, 
    fontWeight: 'bold'
  }
});
