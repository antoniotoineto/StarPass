import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface QueueCardProps {
    id: string,
    title: string;
    queuePosition: string;
    estimatedTime: string;
  }

export default function QueueCard({ id, title, queuePosition, estimatedTime }: QueueCardProps) {
  return (
    <View>
        <Text>Card da fila!</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  attractionCard: {
    width: '100%',
    height: 150,
    backgroundColor: '#dcdcdc',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    gap: 8,
    borderRadius: 15,
    marginTop: 8
  }, 
  textContainer :{
    width: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
});
