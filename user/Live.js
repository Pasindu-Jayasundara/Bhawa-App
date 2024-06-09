import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  Linking,
  ToastAndroid,
} from 'react-native';
import backgroundImage from '../assets/images/background.png';
import {FooterNavigation} from './FooterNavigation';
import facebook from '../assets/images/Facebook.png';
import youtube from '../assets/images/YouTube.png';
import {Upcomming} from './Upcomming';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useEffect, useState, useCallback} from 'react';
import {Ip} from './DbIpAddress';
import {CurrentPerformer} from './CurrentPerformer';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function Live({navigation}) {
  const [streamStatus, setGlobalStreamStatus] = useState(false);
  const [fblink, setFbLink] = useState(null);
  const [ytlink, setYtlink] = useState(null);

  const handleIconPress = url => {
    if (url != undefined) {
      Linking.openURL(url);
    } else {
      ToastAndroid.show("Live Stream Hasn't Started Yet", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    SystemNavigationBar.leanBack();
  }, []);

  function YouTubeLivePlayer() {
    const [streamStatus, setStreamStatus] = useState(false);
    const [streamObj, setStreamObj] = useState({});
    const [message, setMessage] = useState("Live Stream Haven't Started Yet !");

    useEffect(() => {
      getVideoId();
    }, []);

    const getVideoId = () => {
      fetch(Ip + '/bhawa/user/stream.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json.streamStatus == 1) {
            // stream started

            setStreamObj(json);
            setStreamStatus(true);
            setFbLink(json.fbUrl);
            setYtlink(json.youtubeLink);
            setGlobalStreamStatus(true);
          } else if (json.streamStatus == 2) {
            setStreamStatus(false);
            setGlobalStreamStatus(false);
          }

          setTimeout(() => {
            getVideoId();
          }, 20000);
        })
        .catch(error => Alert.alert('Error', error));
    };

    const videoStateChange = useCallback(state => {
      if (state === 'ended') {
        setStreamStatus(false);
        setMessage('Live Stream Ended');
      }
    }, []);

    return (
      <>
        {streamStatus ? (
          <YoutubePlayer
            height={300}
            play={true}
            videoId={streamObj.youtubeId}
            onChangeState={videoStateChange}
          />
        ) : (
          <View style={styles.video}>
            <Text style={styles.videoText}>{message}</Text>
          </View>
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <YouTubeLivePlayer />
          <CurrentPerformer streamStatus={streamStatus} />

          <View style={styles.vote}>
            <Pressable
              onPress={() => {
                handleIconPress(fblink);
              }}>
              <Image source={facebook} style={styles.facebook} />
            </Pressable>
            <Pressable
              onPress={() => {
                handleIconPress(ytlink);
              }}>
              <Image source={youtube} style={styles.facebook} />
            </Pressable>
          </View>
        </View>

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
    marginTop: 30,
  },
};

const styles = StyleSheet.create({
  videoText: {
    color: 'white',
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebook: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  vote: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 10,
  },
  star: {
    width: 20,
    height: 20,
  },
  starView: {
    width: '40%',
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
  },
  label2: {
    width: 49,
    height: 14,
    backgroundColor: '#007C4D',
    borderRadius: 4,
    marginLeft: 5,
  },
  type: {
    fontStyle: 'none',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -25,
    marginRight: 10,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -70,
  },
  detailsMarginTop: {
    marginTop: 10,
  },
  scroll: {
    height: 520,
  },
  text: {
    fontFamily: 'interFont',
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 220,
  },
  title: {
    color: 'grey',
    fontFamily: 'interFont',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  name: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'black',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 15,
    marginRight: 15,
  },
  nowText: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingLeft: 12,
    marginTop: 2,
    marginBottom: 10,
  },
  nowText2: {
    fontSize: 12,
    marginTop: -10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: '#FFFFFF99',
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
