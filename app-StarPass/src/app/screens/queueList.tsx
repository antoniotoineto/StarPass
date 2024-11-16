import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../components/topBar';
import QueueCard from '../components/queueCard';
import queuesData from '../data/queues.json';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function QueueListScreen() {
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.titleContainer}>
        <Link href="/screens/attractionsList" style={{ position: 'absolute', left: 15 }}>
          <Ionicons name="arrow-back-outline" size={30} color="black"/>
        </Link>
        <Text numberOfLines={2} style={{fontSize: 40, textAlign: 'center'}}>Sua fila para a diversão!</Text>
      </View>
      <View style={styles.listContainer}>
        {queuesData.map((queue, key) => (
          <QueueCard 
            key={key}
            id={queue.id}
            title={queue.title}
            queuePosition={queue.queuePosition}
            estimatedTime={queue.estimatedTime}
          />
        ))}
      </View>

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
    gap: 30
  },
  listContainer: {
    width: '85%',
    backgroundColor: 'red',
    height: 500,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  }
});
