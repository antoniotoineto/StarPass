import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import TopBar from '../components/topBar';
import QueueCard from '../components/queueCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAttractions } from '../context/attractionsContext';
import api from '../data/api';
import { usePin } from '../context/pinCodeContext';

interface Queue {
  id: string;
  title: string;
  queuePosition: string;
  estimatedTime: string;
}

export default function QueueListScreen() {
  const { attractions } = useAttractions();
  const { pin } = usePin();
  const [userQueues, setUserQueues] = useState<Queue[]>([]);
  const [isEmpty, setIsEmpty] = useState(false)

  const fetchQueues = async () => {
    try {
      const response = await api.get(`/filas/filas-usuario/${pin}`);
      const queues = response.data.userQueues;
      
      const processedQueues = queues.map((queue: any) => {
        const attraction = attractions.find((attr) => attr.id === queue.attractionId);
        return {
          id: queue.attractionId,
          title: attraction?.name || 'Atração desconhecida',
          queuePosition: queue.queuePosition,
          estimatedTime: queue.estimatedTime,
        };
      });
      setUserQueues(processedQueues);

      setIsEmpty(processedQueues.length === 0);

    } catch (error: any) {
      console.error('Erro ao buscar atrações:', error.message);
    }
  };

  useEffect(() => {
    fetchQueues();
    const interval = setInterval(fetchQueues, 5000);
    return () => clearInterval(interval);
  }, []);

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
        {isEmpty ? (
            <Text style={styles.warningText}>Você não está em nenhuma fila no momento.</Text>
          ) : (
            userQueues.map((queue, key) => (
              <QueueCard
                key={key}
                number={key + 1}
                id={queue.id}
                title={queue.title}
                queuePosition={queue.queuePosition}
                estimatedTime={queue.estimatedTime}
              />
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
    width: '100%',
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
    height: 360
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  warningText: {
    fontSize: 18, 
    color: '#f77474',
    textAlign: 'center'
  }
});
