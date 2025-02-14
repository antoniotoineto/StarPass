import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

interface QueueCardProps {
  number: number
  id: string,
  title: string;
  queuePosition: number;
  estimatedTime: number;
  wave: number
}

export default function QueueCard({ number, title, queuePosition, estimatedTime, wave }: QueueCardProps) {
  const [status, setStatus] = useState<{ message: string; color: string }>({
    message: "Calculando...",
    color: "#c4c4c4"
  });

  const whichStatus = (estimatedTime: number) => {
    if (estimatedTime >= 100) return { message: "Aguarde sua vez", color: "#c4c4c4" }

    if (estimatedTime > 70) return { message: "Embarque próximo", color: "#f7df7c" }

    if (estimatedTime > 1) return { message: "Dirija-se ao brinquedo", color: "#f7a520" }

    if (estimatedTime < 1) return { message: "Embarque imediato", color: "#f74720" }

    return { message: "Calculando...", color: "gray" }
  };

  useEffect(() => {
    setStatus(whichStatus(estimatedTime));
  }, [estimatedTime]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.number}>{number}</Text>
      <View style={styles.cardContainer}>
        <View style={styles.firstLine}>
          <View style={{ width: '70%', marginStart: 0 }}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={{ fontSize: 17, fontWeight: 'bold' }}
            >
              {title}
            </Text>
          </View >
          <View style={styles.leftInfos}>
            <Text style={{ fontSize: 15 }}>{wave}º |</Text>
            <Text style={{ fontSize: 15, color: 'red' }}>
              {`${Math.floor(estimatedTime / 60)}m ${estimatedTime % 60}s`}
            </Text>
          </View>
        </View>

        <View style={styles.secondLine}>
          <Text style={[ styles.status,
            {
              backgroundColor: status.color,
              color: status.color === '#f74720' ? 'white' : 'black'
            }]}>
            {status.message}
          </Text>
          <Text style={{ color: 'grey' }}>Pos. geral: {queuePosition}º</Text>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: '100%',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '90%',
    backgroundColor: '#e6e6e6',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    marginLeft: 10,
  },
  firstLine: {
    flexDirection: 'row',
  },
  leftInfos: {
    flexDirection: 'row',
    gap: 5
  },
  secondLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  status: {
    padding: 3,
    borderRadius: 6,
    fontSize: 12,
  },

});
