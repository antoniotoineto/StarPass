import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import api from '../data/api';
import { usePin } from '../context/pinCodeContext';

interface QueueCardProps {
  number: number
  id: string,
  title: string;
  queuePosition: string;
  estimatedTime: string;
}

export default function QueueCard({ number, id, title, queuePosition, estimatedTime }: QueueCardProps) {
  const { pin } = usePin();

  const handleDeleteQueue = (excludedId: any) => {
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
              const res = await api.post(`/sair-fila/${pin}/${id}`);
              console.log(res.data.message)

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
    <View style={styles.mainContainer}>
      <Text style={styles.number}>{number}</Text>
      <View style={styles.cardContainer}>
        <View style={{ width: '60%' }}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={{ fontSize: 18, fontWeight: 'bold' }}
          >
            {title}
          </Text>
        </View>
        <View style={styles.leftInfos}>
          <Text style={{ fontSize: 15 }}>{queuePosition} |</Text>
          <Text style={{ fontSize: 15, color: 'red' }}>{estimatedTime}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDeleteQueue(id)}>
        <Ionicons name="trash-outline" size={23} color="black" style={{ marginLeft: 5 }} />
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '70%',
    backgroundColor: '#e6e6e6',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginLeft: 10,
  },
  leftInfos: {
    flexDirection: 'row',
    gap: 5
  }
});
