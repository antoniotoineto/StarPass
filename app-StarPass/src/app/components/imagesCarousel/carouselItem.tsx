import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, useWindowDimensions, Text } from 'react-native';

interface ItemProps {
    item: {
        image: string
    }
}

export default function CarouselItem({ item }: ItemProps) {
    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <StatusBar style="auto" />
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
  image: {
    width: '80%',
    height: 300,
    justifyContent: 'center',
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
