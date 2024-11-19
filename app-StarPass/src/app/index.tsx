import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { PinProvider } from './context/pinCodeContext';
import LottieView from 'lottie-react-native';


export default function Home() {
  return (
    <PinProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Logo</Text>
        <View style={styles.infoContainer}>
          <Text style={{fontSize: 28, textAlign: 'center'}}>
            Sua diversão garantida em apenas
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> 3 passos!</Text>
          </Text>

          <LottieView
            source={require('../assets/StepsAnimation.json')}
            autoPlay
            loop
            style={styles.animation}
          />

        </View>
        <Link  href={"/screens/onboarding"} asChild>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.button}>Iniciar</Text>
          </TouchableOpacity>
        </Link>
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
    gap: 40
  },
  text: {
    fontSize: 60,
  },
  infoContainer: {
    width: '80%',
    height: 400,
    alignItems: 'center',
    padding: 15
  },
  animation: {
    width: 300,
    height: 300,
  },
  startButton: {
    backgroundColor: '#b0b0b0',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center'
  },
  button: {
    fontSize: 40,
  }
});
