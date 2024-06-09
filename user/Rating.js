import {StyleSheet, View, Text, ToastAndroid} from 'react-native';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';
import {AirbnbRating} from 'react-native-ratings';
import EncryptedStorage from 'react-native-encrypted-storage';
import DeviceInfo from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import {encrypt} from './Cypher';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';

export const Rating = () => {
  const [ratingValue, setRatingValue] = useState('Good');
  const [starCount, setStarCount] = useState(3);
  const [pagentId, setPagentId] = useState(0);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [pendingVote, setPendingVote] = useState(false);

  const [token, settoken] = useState(0);
  const [uObj, setUObj] = useState({});
  const [ip, setIp] = useState();
  const [androidId, setAndroidId] = useState();
  const [deviceId, setDeviceId] = useState();
  const [uniqueId, setUniqueId] = useState();

  useEffect(() => {
    (async () => {
      await generateDeviceTocken();
      getDbData();
    })();
  }, []);

  async function generateDeviceTocken() {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
    });

    setDeviceId(DeviceInfo.getDeviceId());

    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
    });

    const token = androidId + '' + deviceId + '' + uniqueId;
    const encryptToken = await encrypt(token);

    settoken(encryptToken);

    const u = await EncryptedStorage.getItem('user');
    setUObj(JSON.parse(u));

    NetworkInfo.getIPAddress().then(async ipAddress => {
      const key = await encrypt(ipAddress);
      setIp(key);
    });
  }

  function addVote() {
    if (!alreadyVoted && !pendingVote) {
      // havent voted for this yet
      setPendingVote(true);
      ToastAndroid.show('Voting Started ...', ToastAndroid.SHORT);

      (async()=>{

        const u = await EncryptedStorage.getItem('user');
        var uu = JSON.parse(u);
        var tg = uu.tg;

        var form = new FormData();

        form.append(
          'data',
          JSON.stringify({
            ip: ip,
            uid: uObj.uId,
            token: tg,
            starCount: starCount,
            pagentId: pagentId,
          }),
        );
  
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == 200) {
            var response = JSON.parse(request.responseText);
  
            if (response.status == 2) {
              ToastAndroid.show('Vote Updated ...', ToastAndroid.SHORT);
            } else if (response.status == 1) {
              ToastAndroid.show('Vote Success ...', ToastAndroid.SHORT);
            }
  
            setPendingVote(false);
          }
        };
        request.open('POST', Ip + '/bhawa/user/vote.php', true);
        request.send(form);
      })();

      
    }
  }

  const getDbData = () => {
    var form = new FormData();
    form.append('ip', ip);
    form.append('uid', uObj.uId);
    form.append('token', uObj.token);
    form.append('page', 2);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        console.log(request.responseText);

        var response = JSON.parse(request.responseText);
        console.log("getdbdta "+request.responseText)
        if (response.status == 1) {
          // performing ewa avaliable

          setPagentId(response.id);

          if (response.voted == 1) {
            // already voted
            setAlreadyVoted(true);
          } else if (response.voted == 2) {
            setAlreadyVoted(false);
          }
        }
        setTimeout(() => {
          // getDbData();
        }, 10000);
      }
    };
    request.open('POST', Ip + '/bhawa/user/currentPageant.php', true);
    request.send(form);
  };

  return (
    <>
      <View style={styles.ratingContainer}>
        <AirbnbRating
          count={6}
          defaultRating={starCount}
          size={30}
          showRating={false}
          isDisabled={alreadyVoted}
          onFinishRating={value => {
            const review = [
              'OK',
              'Good',
              'Very Good',
              'Wow',
              'Amazing',
              'Unbelievable',
            ];
            setRatingValue(review[value - 1]);
            setStarCount(value);
          }}
        />
        <Text style={styles.ratingValueText}>{ratingValue}</Text>
      </View>
      <View style={styles.buttonView}>
        <Ripple rippleDuration={1000} onPress={addVote}>
          <LinearGradient
            style={styles.button}
            colors={['#4C63D2', '#BC3081', '#F47133', '#FED576']}>
            <Text style={styles.votetext}>Vote</Text>
          </LinearGradient>
        </Ripple>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  votetext: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'interFont',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
