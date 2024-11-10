import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TopBar() {
  return (
    <View style={styles.topBar}>
        <Text style={{fontSize:45, fontWeight: 'bold'}}>Logo</Text>
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
});
