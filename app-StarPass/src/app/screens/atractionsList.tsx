import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/topBar';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.listContainer}>
        <Link href={'/screens/atractionDetails'}>Lista de brinquedos aqui</Link>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={[styles.bottomButtons, {backgroundColor: 'red'}]}>
          <Link href='/' style={styles.bottomButtonText}>Sair do parque</Link>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.bottomButtons, {backgroundColor: '#bdbdbd'}]}>
          <Link href='screens/queueList'style={styles.bottomButtonText}>Consultar filas</Link>
        </TouchableOpacity>
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
  bottomButtons: {
    padding: 10,
    borderRadius: 10
  },
  bottomButtonText:{
    fontSize: 15, 
    fontWeight: 'bold'
  }
});
