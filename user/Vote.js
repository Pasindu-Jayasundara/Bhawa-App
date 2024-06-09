import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import backgroundImage from '../assets/images/background.png';
import {FooterNavigation} from './FooterNavigation';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useEffect, useState, useCallback} from 'react';
import {Ip} from './DbIpAddress';
import {CurrentPageant} from './CurrentPageant';
import {Rating} from './Rating';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export const Vote = ({navigation}) => {
  useEffect(() => {
    SystemNavigationBar.leanBack();
  }, []);

  const [streamStatus, setGlobalStreamStatus] = useState(false);

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
            mute={true}
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

          <CurrentPageant streamStatus={streamStatus} />

          <Rating />
        </View>
      </ImageBackground>
      <FooterNavigation navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ratingValueText: {
    color: 'gold',
    fontWeight: 'bold',
    right: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'black',
    paddingVertical: 20,
  },
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
