import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function OnboardingScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [visibleSteps, setVisibleSteps] = useState([true, false, false]); // Already showing the first rule
    const fadeAnim = [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)];

    const steps: { id: number; content: string; icon: "password" | "search" | "qr-code"; }[] = [
        { id: 1, content: 'Insira sua senha de entrada para obter acesso completo ao aplicativo.', icon: "password" },
        { id: 2, content: 'Procure o brinquedo desejado e entre na fila.', icon: "search" },
        { id: 3, content: 'Acompanhe o status da sua fila e, ao chegar sua vez, apresente o QR Code na entrada.', icon: "qr-code" },
    ];

    const handleNextStep = () => {
        if (currentStep < steps.length) {
            setVisibleSteps((prev) => {
                const updated = [...prev];
                updated[currentStep] = true;
                return updated;
            });

            Animated.timing(fadeAnim[currentStep], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setCurrentStep((prev) => prev + 1);
            });
        } else {
            router.push('/screens/getEntryCode');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Link href="/" style={{ position: 'absolute', left: 10 }}>
                    <Ionicons name="arrow-back-outline" size={30} color="black" />
                </Link>
                <Text style={styles.text}>Logo</Text>
            </View>
            <View style={styles.infoContainer}>
                <View style={{ flex: 1, width: '100%' }}>
                    {steps.map((step, index) => (
                        <Animated.View
                            key={step.id}
                            style={[
                                styles.stepContainer,
                                { opacity: fadeAnim[index] },
                            ]}
                        >
                            {visibleSteps[index] &&
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', paddingRight: 10 }}>{step.id}</Text>
                                        <Text style={styles.stepText}>{step.content}</Text>
                                    </View>
                                    <MaterialIcons name={step.icon} size={35} color="black" style={{marginTop: 5}} />
                                </View>
                            }
                        </Animated.View>
                    ))}
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <Link href={"/screens/getEntryCode"} asChild>
                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={{ fontSize: 20 }}>Pular</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity
                    style={[styles.nextButton, { backgroundColor: currentStep === steps.length ? '#7deb6e' : '#b0b0b0' }]}
                    onPress={handleNextStep}
                >
                    <Text style={[{ fontSize: 25, }]}>
                        {currentStep === steps.length ? 'Iniciar' : 'Próximo'}
                    </Text>
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
    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    text: {
        fontSize: 60,
    },
    infoContainer: {
        width: '100%',
        height: 500,
        alignItems: 'center',
        padding: 10,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 15,

    },
    stepContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    stepText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        textAlign: 'left',
        backgroundColor: '#e3e3e3',
        padding: 10,
        borderRadius: 8,
        width: '100%'
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
