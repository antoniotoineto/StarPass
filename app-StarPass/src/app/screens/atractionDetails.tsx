import { Link } from 'expo-router';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import TopBar from '../components/topBar';

export default function App() {
  return (
    <View style={styles.container}>
      <TopBar />

      <View style={styles.atractionTitle}></View>

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

  },
  imagesContainer: {

  },
  infoContainer:{

  },
  locContainer:{

  }
});
