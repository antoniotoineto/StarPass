import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/topBar';
import AttractionCard from '../components/atractionCard';
import attractionsData from '../data/atractions.json';

export default function atractionsList() {
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
