import { Link } from 'expo-router';
import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';


export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([false, false, false]);
  const fadeAnim = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];

  const steps: { id: number; content: string; position: 'top' | 'middle' | 'bottom' }[]  = [
    { id: 1, content: 'Insira sua senha de entrada para obter acesso completo ao aplicativo.', position: 'top' },
    { id: 2, content: 'Procure o brinquedo desejado e entre na fila.', position: 'middle' },
    { id: 3, content: 'Acompanhe o status da sua fila e, ao chegar sua vez, apresente o QR Code na entrada.', position: 'bottom' },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const updatedSteps = [...visibleSteps];
      updatedSteps[currentStep] = true;
      setVisibleSteps(updatedSteps);

      Animated.timing(fadeAnim[currentStep], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setCurrentStep(currentStep + 1);
    } else {
      router.push('/screens/attractionsList');
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Logo</Text>
        <View style={styles.infoContainer}>
            {steps.map((step, index) => (
                <Animated.View
                    key={step.id}
                    style={[
                        styles.stepContainer,
                        styles[step.position],
                        { opacity: fadeAnim[index] },
                    ]}
                >
                    {visibleSteps[index] && <Text style={styles.stepText}>{step.content}</Text>}
                </Animated.View>
            ))}
        </View>
        <View style={styles.buttonsContainer}>
            <Link  href={"/screens/getEntryCode"} asChild>
                <TouchableOpacity style={styles.skipButton}>
                    <Text style={{fontSize: 20}}>Pular</Text>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
                <Text style={{fontSize: 25}}>{currentStep === steps.length ? 'Iniciar' : 'Próximo'}</Text>
            </TouchableOpacity>
        </View>
        
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 35,
  },
  text: {
    fontSize: 60,
  },
  infoContainer: {
    width: '100%',
    height: 500,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 15
  },
  stepContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  top: {
    top: '10%',
  },
  middle: {
    top: '40%',
  },
  bottom: {
    top: '70%',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    backgroundColor: '#e3e3e3',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10
  },
  nextButton: {
    backgroundColor: '#b0b0b0',
    padding: 10,
    borderRadius: 10
  }

});
