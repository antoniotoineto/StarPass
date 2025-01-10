import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface AttractionCardProps {
    id: string,
    image: string,
    title: string;
    subtitle: string;
    description: string;
    minimumHeight: string;
    averageTime: string;
    location: string;
    carouselImages: string[];
  }

export default function AttractionCard({ id, image, title, subtitle, description, minimumHeight, averageTime, location, carouselImages }: AttractionCardProps) {
  return (
    <Link href={{
      pathname: '/screens/attractionDetails',
      params: {
        id,
        title,
        subtitle,
        description,
        minimumHeight,
        averageTime,
        location,
        carouselImages: JSON.stringify(carouselImages)
      }
      }} asChild>
        <TouchableOpacity style={styles.attractionCard}>
            <Image 
                source={{ uri: image }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>{title}</Text>
                
                <Text>
                    <Text style={{fontWeight: 'bold'}}>Característica:</Text> {subtitle}{"\n"}
                    <Text style={{fontWeight: 'bold'}}>Altura mínima:</Text> {minimumHeight}{"\n"}
                    <Text style={{fontWeight: 'bold'}}>Duração média:</Text> {averageTime}{"\n"}
                </Text>

            </View>
        </TouchableOpacity>
    </Link>
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
