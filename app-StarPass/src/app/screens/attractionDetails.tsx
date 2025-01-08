import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView, Alert  } from 'react-native';
import TopBar from '../components/topBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import ImagesCarousel from '../components/imagesCarousel/imagesCarousel';
import { StatusBar } from 'expo-status-bar';
import api from '../data/api';
import { usePin } from '../context/pinCodeContext';

export default function AttractionDetailsScreen() {
  
  const { id, title, subtitle, description, minimumHeight, avarageTime, location, carouselImages } = useLocalSearchParams();
  const { pin } = usePin()
  const router = useRouter();
  const locationString = String(location);
  const parsedImages = carouselImages ? JSON.parse(carouselImages as string) : [];
  const iconName = subtitle === 'Insano' ? 'flash' :
                 subtitle === 'Relaxante' ? 'cafe' :
                 subtitle === 'Instigante' ? 'flashlight-sharp' :
                 'help-circle';

  const handleConfirm = () => {
    Alert.alert(
      "Entrar na fila",
      "Deseja entrar na fila para esse brinquedo?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Entrar",
          onPress: async () => {
            try{
              const res = await api.post('/entrar-fila', { id: id, atractionName: title, userCode: pin });
              console.log(res.data.message)
              router.push("/screens/queueList")

            } catch (error){
              console.error("Erro ao entrar na fila:", error);

            }
          },
        },
      ]
    );

  }
                 
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{marginTop: 14}}>
          <TopBar />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.attractionTitle}>
            <Link href="/screens/attractionsList" style={{ position: 'absolute', left: 15 }}>
              <Ionicons name="arrow-back-outline" size={30} color="black"/>
            </Link>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>{title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Ionicons name={iconName} size={22} color="black" style={{marginLeft: 5}}/>
              </View>
            </View>
          </View>

          <View style={[styles.imagesContainer]}>
            <ImagesCarousel images={parsedImages}/>
          </View>

          <View>
            <Text style={{fontSize: 30}}>Informações</Text>
            <View style={styles.infoContainer}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Descrição:</Text>{description}{"\n"}
                <Text style={{fontWeight: 'bold'}}>Altura mínima:</Text>{minimumHeight}{"\n"}
                <Text style={{fontWeight: 'bold'}}>Tempo médio:</Text> {avarageTime}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 35}}>
            <Text style={{fontSize: 30}}>Localização</Text>
            <View style={styles.locContainer}>
              <Image source={{uri: locationString}} style={styles.image}/>
            </View>
          </View>

          <TouchableOpacity onPress={()=>handleConfirm()} style={styles.entryQueueButton}>
            <Text style={{fontSize:25}}>Entrar na fila</Text>
          </TouchableOpacity>
        </ScrollView>

      </View>
      <StatusBar style="auto" backgroundColor='white'/>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
  attractionTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
    maxWidth: '80%',
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 28,
    alignItems: 'center',
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
