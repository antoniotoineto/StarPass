import { StyleSheet, Text, View, useWindowDimensions, Animated } from 'react-native';

interface CarouselPaginatorProps {
    data: any[];
    scrollX: Animated.Value; // Defina scrollX como Animated.Value para habilitar a interpolação
  }

export default function CarouselPaginator ({data, scrollX}: CarouselPaginatorProps) {
    const {width} = useWindowDimensions();

  return (
    <View style={{flexDirection: 'row', height: 64}}>
        {data.map((_: any, i: any) =>{ 
            const inputRange = [(i-1)*width, i*width, (i+1)*width]

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [10,20,30],
                extrapolate: 'clamp',
            })

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3,1,0.3],
                extrapolate: 'clamp',
            })

            return <Animated.View style={[styles.dot, {width: dotWidth, opacity}]} key={i.toString()}/>
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot:{
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 8,
    marginTop: 10
  },

});
