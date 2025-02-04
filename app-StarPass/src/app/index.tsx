import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';


export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_StarPass_nome.png')} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 28, textAlign: 'center' }}>
          Sua diversão garantida em apenas
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}> 3 passos!</Text>
        </Text>

        <LottieView
          source={require('../assets/StepsAnimation.json')}
          autoPlay
          loop
          style={styles.animation}
        />

      </View>
      <Link href={"/screens/onboarding"} asChild>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.button}>Iniciar</Text>
        </TouchableOpacity>
      </Link>
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
  image: {
    width: 350,
    height: 250,
    marginRight: 15
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
    backgroundColor: '#2cc4f6',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center'
  },
  button: {
    fontSize: 40,
    color: 'white'
  }
});
