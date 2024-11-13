import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../components/topBar';

export default function QueueListScreen() {
  return (
    <View style={styles.container}>
      <TopBar />
      <Text style={styles.text}>Lista de filas!</Text>
      <Link style={styles.button} href={"/screens/attractionsList"}>Voltar</Link>
      <StatusBar style="auto" />
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
  text: {
    fontSize: 30,
  },
  button: {
    marginTop: 15,
  }
});
