import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, useWindowDimensions, Animated, ViewToken, ViewabilityConfig } from 'react-native';
import CarouselItem from './carouselItem';
import { useRef, useState } from 'react';
import CarouselPaginator from './carouselPaginator';

interface CarouselImagesProps {
  images: string[]
}

export default function ImagesCarousel({images}: CarouselImagesProps) {
    const {width} = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    };

    const viewConfig: ViewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList 
        data={images}
        renderItem={({item})=> <CarouselItem item={{ image: item }}/>} 
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        style={{width}}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
        />
      
      <CarouselPaginator data={images} scrollX={scrollX} />
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
