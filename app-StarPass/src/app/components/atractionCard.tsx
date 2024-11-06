import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface AtractionCardProps {
    image: string,
    title: string;
    feature: string;
    minimumHeight: string;
    avarageTime: string;
  }

export default function AtractionCard({ image, title, feature, minimumHeight, avarageTime }: AtractionCardProps) {
  return (
    <Link href={'/screens/atractionDetails'} asChild>
        <TouchableOpacity style={styles.atractionCard}>
            <Image 
                source={{ uri: image }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>{title}</Text>
                
                <Text style={styles.description}>
                    <Text style={{fontWeight: 'bold'}}>Característica:</Text> {feature}{"\n"}
                    <Text style={{fontWeight: 'bold'}}>Altura mínima:</Text> {minimumHeight}{"\n"}
                    <Text style={{fontWeight: 'bold'}}>Tempo médio:</Text> {avarageTime}{"\n"}
                </Text>

            </View>
        </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  atractionCard: {
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
  description: {
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
});
