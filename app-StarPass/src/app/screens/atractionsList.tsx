import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/topBar';
import AtractionCard from '../components/atractionCard';
import attractionsData from '../data/atractions.json';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.listContainer}>
        <ScrollView>
        {attractionsData.map((attraction) => (
          <AtractionCard
            image={attraction.image}
            title={attraction.title}
            feature={attraction.feature}
            minimumHeight={attraction.minimumHeight}
            avarageTime={attraction.avarageTime}
          />
        ))}
        </ScrollView>
      </View>

      <View style={styles.bottomBar}>
        <Link href='/' asChild>
          <TouchableOpacity style={styles.exitButton}>
            <Text style={styles.bottomButtonText}>Sair do parque</Text>
          </TouchableOpacity>
        </Link>

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
  },
  listContainer: {
    width: '80%',
    height: 500,
  }, 
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 35,
    justifyContent: 'space-between',
    bottom: 60,
    position: 'absolute'
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
