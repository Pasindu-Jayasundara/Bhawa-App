import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import backgroundImage from '../assets/images/background.png';
import {FooterNavigation} from './FooterNavigation';
import {Upcomming} from './Upcomming';
import LinearGradient from 'react-native-linear-gradient';
import {Ip} from './DbIpAddress';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function Home({navigation}) {
  const [performeObj, setPerformeObj] = useState();
  const [performStatus, setPerformStatus] = useState(false);
  const [registeredCount, setRegisteredCount] = useState(false);

  useEffect(() => {
    SystemNavigationBar.leanBack();
    getDbData();
  }, []);

  const getDbData = () => {
    fetch(Ip + '/bhawa/user/home.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json[0] == 1) {
          // event avaliable

          setPerformeObj(json[1][0]);
          setPerformStatus(true);
          setRegisteredCount(json[2]);
        } else {
          setPerformStatus(false);
        }

        setTimeout(() => {
          getDbData();
        }, 10000);
      })
      .catch(error => Alert.alert('Error', error));
  };
  //..........................

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        {performStatus && (
          <Pressable onPress={() => navigation.navigate('Live')}>
            <Text style={styles.nowText}>Now Performing</Text>
            <ImageBackground
              source={{uri: performeObj.url}}
              resizeMode="cover"
              style={styles.performerImage}>
              <LinearGradient
                colors={['rgba(33, 33, 33, 0.01)', '#000']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradient}>
                <View style={styles.watch}>
                  <View style={styles.watchBtn}>
                    <Image source={require('../assets/images/watchNow.png')} />
                    <Pressable>
                      <Text style={styles.watchNowText}>Watch Now</Text>
                    </Pressable>
                  </View>
                  <View style={styles.watchCount}>
                    <Image
                      source={require('../assets/images/watchCount.png')}
                    />
                    <Text style={[styles.watchNowText, styles.watchCountText]}>
                      {registeredCount}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailView}>
                  <Text style={styles.name}>{performeObj.name}</Text>
                  <View style={styles.labelView}>
                    <View style={styles.label1}>
                      <Text style={styles.labelText}>{performeObj.type}</Text>
                    </View>
                    <View style={styles.label2}>
                      <Text style={styles.labelText}>{performeObj.event}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </Pressable>
        )}

        <Upcomming scroll={upcomming} navigation={navigation} />
      </ImageBackground>

      <FooterNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const upcomming = {
  scroll: {
    maxHeight: '81.25%',
  },
  next: {
    marginTop: 50,
  },
};

const styles = StyleSheet.create({
  star: {
    width: '20px',
    height: '20px',
  },
  starView: {
    width: '70%',
    height: '50px',
    borderRadius: 7,
    background: '#151515',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  labelText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'interFont',
    paddingHorizontal: 5,
  },
  label2: {
    width: '49px',
    height: '14px',
    backgroundColor: '#C2C65B',
    borderRadius: 4,
    marginLeft: 5,
  },
  label1: {
    width: '36px',
    height: '14px',
    backgroundColor: '#007C4D',
    borderRadius: 4,
  },
  labelView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  name: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'interFont',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  detailView: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  watchCountText: {
    marginLeft: 8,
  },
  watchCount: {
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center',
    marginTop: -5,
  },
  watchNowText: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  watchBtn: {
    width: '123px',
    height: '35px',
    borderRadius: 7,
    background: '#000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  watch: {
    width: '100%',
    height: '50px',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 5,
  },
  gradient: {
    width: '96%',
    height: '100%',
    position: 'relative',
  },
  performerImage: {
    width: '96%',
    height: 240,
    alignSelf: 'flex-end',
  },
  nowText: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingLeft: 12,
    marginTop: 22,
    marginBottom: 10,
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
