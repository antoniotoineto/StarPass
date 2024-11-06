import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TopBar from './topBar';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.atractionTitle}>
        <Link href="/screens/getEntryCode" style={{paddingStart: 35}}>
          <Ionicons name="arrow-back-outline" size={30} color="black"/>
        </Link>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Brinquedo 1</Text>
          <Text style={styles.subtitle}>
            Insano
            <Ionicons name="flash" size={22} color="black" />
          </Text>
          
        </View>
      </View>

      <View style={styles.imagesContainer}></View>

      <View style={styles.infoContainer}></View>

      <View style={styles.locContainer}></View>

      <TouchableOpacity onPress={()=>console.log('Entrou na fila!')}>
        <Text>Entrar na fila</Text>
      </TouchableOpacity>

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
  atractionTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 160

  },
  titleContainer: {
    alignItems: 'center',
    position: 'absolute',
    marginStart: '28%'
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 28,
    alignItems: 'center'
  },  
  imagesContainer: {

  },
  infoContainer:{

  },
  locContainer:{

  }
});
