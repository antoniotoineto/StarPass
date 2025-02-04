import { Link } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TopBar() {
  return (
    <View style={styles.topBar}>
        <Image source={require('../../assets/logo_StarPass.png')} style={styles.image} />
        <Link href={'/screens/qrCode'} style={{}}>
            <Ionicons name="qr-code-sharp" size={30} color="black"/>
        </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
  }, 
  image: {
    width: 140,
    height: 60,
  },
});
