import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { PinProvider } from './context/pinCodeContext';

export default function Home() {
  return (
    <PinProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Star Pass</Text>
        <Link style={styles.button} href={"/screens/getEntryCode"}>Get Started!</Link>
        <StatusBar style="auto" />
      </View>
    </PinProvider>
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
    fontSize: 50,
  },
  button: {
    fontSize: 50,
    marginTop: 15,
  }
});
