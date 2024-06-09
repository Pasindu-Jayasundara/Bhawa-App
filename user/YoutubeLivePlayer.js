import {StyleSheet, View, Text} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useEffect, useState, useCallback} from 'react';
import {Ip} from './DbIpAddress';

export function YouTubeLivePlayer() {
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
        } else if (json.streamStatus == 2) {
          setStreamStatus(false);
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
          mute={true}
          height={300}
          play={true}
          videoId={streamObj.youtubeId}
          onChangeState={videoStateChange}
        />
      ) : (
        <View style={styles.video}>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  video: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
