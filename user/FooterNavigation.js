import {StyleSheet, View, Image, Pressable, ToastAndroid} from 'react-native';
// import home from '../assets/images/home.svg';
import home from '../assets/images/newFooterHome.png';
import leadboard from '../assets/images/leadboard.png';
// import setting from '../assets/images/setting.svg';
import setting from '../assets/images/newFooterSetting.png';
import SvgUri from 'react-native-svg-uri-maintained';
import FAB from 'react-native-animated-fab';
import votingImg from '../assets/images/raise-hand.png';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';

export function FooterNavigation({navigation}) {
  const [floatingButtonVisible, setFloatingButtonVisible] = useState(false);
  const [leadButton, setLeadButton] = useState(false);

  useEffect(() => {
    loadButtonVisibleData();
  }, []);

  const loadButtonVisibleData = () => {
    fetch(Ip + '/bhawa/user/floatingButton.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.floating == 1) {
          setFloatingButtonVisible(true);
        } else if (json.floating == 2) {
          setFloatingButtonVisible(false);
        }

        if (json.lead == 1) {
          setLeadButton(true);
        } else if (json.lead == 2) {
          setLeadButton(false);
        }

        setTimeout(() => {
          loadButtonVisibleData();
        }, 8000);
      })
      .catch(error => Alert.alert('Error', error));
  };

  return (
    <>
      {floatingButtonVisible && (
        <FAB
          renderSize={60}
          borderRadius={30}
          onPress={() => navigation.navigate('Vote')}
          backgroundColor="#5BD7FF"
          bottomOffset={100}
          icon={votingImg}
          iconSize={30}
        />
      )}
      <View style={styles.footerNavigation}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image source={home} style={styles.icon} />
        </Pressable>
        {leadButton && (
          <Pressable onPress={() => navigation.navigate('Leadboard')}>
            <Image source={leadboard} style={styles.leadboard} />
          </Pressable>
        )}
        <Pressable onPress={() => navigation.navigate('Setting')}>
          <Image source={setting} style={styles.icon} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  line: {
    width: 130,
    height: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  leadboard: {
    width: 33,
    height: 26,
  },
  icon: {
    width: 27,
    height: 27,
  },
  footerNavigation: {
    backgroundColor: '#161616F0',
    width: '100%',
    height: 78.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
