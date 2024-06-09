import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Text,
  ScrollView,
} from 'react-native';
import backgroundImage from '../assets/images/background.png';
import {FooterNavigation} from './FooterNavigation';
import QRCode from 'react-native-qrcode-svg';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';
import EncryptedStorage from 'react-native-encrypted-storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';

import {encrypt} from './Cypher';

export function Ticket() {
  const [qrObj, setQrObj] = useState({});
  const [qrEncryptCode, setQrEncryptCode] = useState();

  useEffect(() => {
    SystemNavigationBar.leanBack();
    (async () => {
      const u = await EncryptedStorage.getItem('user');
      const user = JSON.parse(u);

      var form = new FormData();
      form.append('uId', user.uId);
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
          var json = JSON.parse(request.responseText);

          var obj = {
            ticketNumber: json.number,
            paid: json.paid,
            uId: user.uId,
            tg: user.tg,
          };

          (async () => {
            const en = await encrypt(JSON.stringify(obj));
            setQrEncryptCode(en);
          })();
          setQrObj(obj);
        }
      };
      request.open('POST', Ip + '/bhawa/user/ticket.php', true);
      request.send(form);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView contentContainerStyle={styles.qrContainer}>
          <Text style={styles.nowText}>Ticket QR</Text>
          <View style={styles.qr}>
            <View style={styles.border}>
              <QRCode
                value={qrEncryptCode}
                color="black"
                backgroundColor="white"
                size={155}
              />
            </View>
            <Text style={styles.no}>No. {qrObj.ticketNumber}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
      <FooterNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  no: {
    color: '#FFFFFF99',
    fontSize: 12,
    marginTop: 5,
  },
  qrContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  border: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
  },
  qr: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nowText: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 0,
  },
});
