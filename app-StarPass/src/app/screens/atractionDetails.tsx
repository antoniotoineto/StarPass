import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView  } from 'react-native';
import TopBar from '../components/topBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImagesCarousel from '../components/imagesCarousel/imagesCarousel';

interface AtractionDetailsProps {
  title: string;
  subtitle: string;
  images: string[],
  description: string,
  minimumHeight: string;
  avarageTime: string;
  location: string;
}

export default function atractionDetails({
  title, 
  subtitle, 
  images, 
  description, 
  minimumHeight, 
  avarageTime, 
  location}: AtractionDetailsProps) {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          <TopBar />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.atractionTitle}>
            <Link href="/screens/atractionsList" style={{paddingStart: 35}}>
              <Ionicons name="arrow-back-outline" size={30} color="black"/>
            </Link>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>Brinquedo 1</Text>
              <Text style={styles.subtitle}>
                Insano
                <Ionicons name="flash" size={22} color="black" />
              </Text>
              
            </View>
          </View>

          <View style={[styles.imagesContainer]}>
            <ImagesCarousel />
          </View>

          <View>
            <Text style={{fontSize: 30}}>Informações</Text>
            <View style={styles.infoContainer}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Descrição:</Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, consequatur{"\n"}
                <Text style={{fontWeight: 'bold'}}>Altura mínima:</Text> 1.42m{"\n"}
                <Text style={{fontWeight: 'bold'}}>Tempo médio:</Text> 20seg
              </Text>
            </View>
          </View>

          <View style={{marginTop: 35}}>
            <Text style={{fontSize: 30}}>Localização</Text>
            <View style={styles.locContainer}>
              <Image source={{uri: 'https://via.placeholder.com/110'}} style={styles.image}/>
            </View>
          </View>

          <TouchableOpacity onPress={()=>console.log('Entrou na fila!')} style={styles.entryQueueButton}>
            <Text style={{fontSize:25}}>Entrar na fila</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1917',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15
  },
  scrollContainer:{
    paddingTop: 5,
    paddingBottom: 50,
    alignItems: 'center',
  },
  atractionTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginEnd: '24%'
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 28,
    alignItems: 'center'
  },  
  imagesContainer: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  slide: {
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    height: 250,
  },
  infoContainer:{
    width: '85%',
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    padding: 10,
    marginTop: 6
  },
  locContainer:{
    width: '85%',
    marginTop: 6
  },
  image: {
    width: 320,
    height: 150,
    justifyContent: 'center',
    borderRadius: 10,
  },
  entryQueueButton: {
    width: '80%',
    alignItems: 'center',
    marginTop: 35,
    backgroundColor: '#cfd0d1',
    borderRadius: 10,

  }
});
