import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lista de brinquedos</Text>
      <Link style={styles.button} href={"/screens/atractionDetails"}>Detalhes do brinquedos</Link>
      <Link style={styles.button} href={"/screens/qrCode"}>QR Code</Link>
      <Link style={styles.button} href={"/"}>Voltar</Link>
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
