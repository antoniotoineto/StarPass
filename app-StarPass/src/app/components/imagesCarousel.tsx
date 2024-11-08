import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, useWindowDimensions } from 'react-native';
import carouselData from '../data/atractionImages.json';
import CarouselItem from './carouselItem';


export default function ImagesCarousel() {
    const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList 
        data={carouselData}
        renderItem={({item})=> <CarouselItem item={item}/>} 
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        style={{width}}
        
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
