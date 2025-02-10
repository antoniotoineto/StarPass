import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function OnboardingScreen() {
    const router = useRouter();

    const steps = [
        { id: 1, content: 'Insira a senha de entrada apresentada no guichê que você selecionar na próxima tela.', icon: "password" },
        { id: 2, content: 'Acesse o brinquedo desejado na lista, entre na página de detalhes e ingresse na fila.', icon: "search" },
        { id: 3, content: 'Acompanhe o status da sua fila e, ao chegar sua vez, apresente o QR Code na entrada.', icon: "qr-code" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Link href="/" style={{ position: 'absolute', left: 10 }}>
                    <Ionicons name="arrow-back-outline" size={30} color="black" />
                </Link>
                <Image source={require('../../assets/logo_StarPass.png')} style={styles.image} />
            </View>
            
            
            <View style={styles.infoContainer}>
            <Text style={styles.title}>Como usar?</Text>

                {steps.map((step) => (
                    <View key={step.id} style={styles.stepContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', paddingRight: 10 }}>{step.id}</Text>
                            <Text style={styles.stepText}>{step.content}</Text>
                        </View>
                        <MaterialIcons name={step.icon} size={35} color="black" style={{ marginTop: 5 }} />
                    </View>
                ))}
            </View>
            
            <View style={styles.buttonsContainer}>
                <Link href={"/screens/getEntryCode"} asChild>
                    <TouchableOpacity style={styles.nextButton}>
                        <Text style={{ fontSize: 25, color: 'white' }}>Iniciar</Text>
                    </TouchableOpacity>
                </Link>
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
    image: {
        width: 250,
        height: 90,
        marginRight: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#363636"

    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 15,
    },
    stepContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    stepText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
        textAlign: 'left',
        backgroundColor: '#f2efaa',
        padding: 10,
        borderRadius: 8,
        width: '100%'
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    nextButton: {
        backgroundColor: '#2cc4f6',
        padding: 10,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
