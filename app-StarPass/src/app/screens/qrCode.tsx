import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../components/topBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePin } from '../context/pinCodeContext';
import QRCode from 'react-native-qrcode-svg';


export default function QrCodeScreen() {
  const { pin } = usePin();
  console.log("PIN: ", pin);

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.titleContainer}>
        <Text style={styles.text}>QR Code</Text>
        <Link href="/screens/attractionsList" style={{ position: 'absolute', left: 15 }}>
          <Ionicons name="arrow-back-outline" size={30} color="black"/>
        </Link>
      </View>

      <Text style={{fontSize: 25, textAlign: 'center'}}>Apresente na entrada para a diversão!</Text>
      
      <View style={styles.qrCodeContainer}>
        {pin ? (
          
          <View style={styles.qrCode}>
            <QRCode value={pin} size={250} />
          </View>
        ) : (
          <View style={styles.qrCode}>
            <Text style={{textAlign: 'center'}}>QR Code não disponível. Peça suporte à algum funcionário do parque.</Text>
          </View>
        )}
      </View>
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
    gap: 30
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  qrCodeContainer :{
    width: '85%',
    height: 475,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 95
  },
  qrCode: {
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

});
