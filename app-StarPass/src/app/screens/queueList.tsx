import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../data/api';
import TopBar from '../components/topBar';
import QueueCard from '../components/queueCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserQueues } from '../hooks/fetchUserQueues';
import { usePin } from '../context/pinCodeContext';

export default function QueueListScreen() {
  const { userQueues, isEmpty, fetchQueues } = useUserQueues();
  const { pin } = usePin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueues();
    const interval = setInterval(fetchQueues, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userQueues.length > 0 || isEmpty) {
      setIsLoading(false); 
    }
  }, [userQueues, isEmpty]);

  const handleDeleteQueue = (attractionId: string) => {
    Alert.alert(
      "Sair da fila",
      "Tem certeza que deseja sair dessa fila?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            try {
              const res = await api.post(`/filas/sair-fila/${pin}/${attractionId}`);
              console.log(res.data.message);
              fetchQueues();

            } catch (error: any) {
              if (error.response) {
                console.error('Erro no servidor:', error.response.data);
                console.log("Erro: ", error.response.status)
              } else {
                console.error('Erro inesperado:', error.message);
              }
            }
          },
        },
      ]
    );

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 14 }}>
        <TopBar />
      </View>
      <View style={styles.titleContainer}>
        <Link href="/screens/attractionsList" style={{ position: 'absolute', left: 15 }}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </Link>
        <Text numberOfLines={2} style={{ fontSize: 40, textAlign: 'center' }}>Sua fila para a diversão!</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listContainer}>
        {isLoading ? (
            <Text style={[styles.warningText, {color: '#a3a3a2'}]}>Carregando filas...</Text>
          ) : isEmpty ? (
            <Text style={[styles.warningText, {color: '#f77474'}]}>Você não está em nenhuma fila no momento.</Text>
          ) : (
            userQueues.map((queue, key) => (
              <View key={queue.id}style={styles.cardContainer}>
                <QueueCard
                  number={key + 1}
                  id={queue.id}
                  title={queue.title}
                  queuePosition={queue.queuePosition}
                  estimatedTime={queue.estimatedTime}
                  wave={queue.wave}
                />
                <TouchableOpacity onPress={() => handleDeleteQueue(queue.id)}>
                  <Ionicons name="trash-outline" size={23} color="black" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  scrollContainer: {
    width: "100%",
    minWidth: 310,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#a3a3a2',
    padding: 15,
  },
  listContainer: {
    width: '100%',
    alignItems: 'flex-start',
    minHeight: 360,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  warningText: {
    fontSize: 18,
    textAlign: 'center'
  }
});
