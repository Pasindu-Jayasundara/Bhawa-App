import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Text,
  FlatList,
} from 'react-native';
import backgroundImage from '../assets/images/background.png';
import filledStar from '../assets/images/filledStar.png';
import {FooterNavigation} from './FooterNavigation';
import {Ip} from './DbIpAddress';
import {useEffect, useRef, useState} from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function Leadboard({navigation}) {
  const [first3PageantArr, setFirst3PageantArr] = useState([]);
  const [secondPageantArr, setSecondPageantArr] = useState([]);
  const [leadboardStatus, setLeadboardStatus] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    SystemNavigationBar.leanBack();
    loadData();
  }, []);

  function loadData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        console.log('le ' + request.responseText);

        var response = JSON.parse(request.responseText);
        if (response[0] == 1) {
          // show loadboard

          setFirst3PageantArr(response[1]);
          setSecondPageantArr(response[2]);
          setLeadboardStatus(true);
        } else if (response[0] == 2) {
          // hide leardboard
          setLeadboardStatus(false);
        }
      }
    };
    request.open('POST', Ip + '/bhawa/user/leadboard.php', true);
    request.send();
  }

  function card({item}) {
    return (
      <>
        <View style={count.current < 3 ? styles.wrap : styles.wrap2}>
          {count.current < 3 && (
            <View
              style={[
                styles.leftSide,
                [styles.yellow, styles.grey, styles.orange][count.current],
              ]}></View>
          )}
          <View style={styles.card}>
            {count.current < 3 ? (
              <Text style={styles.place}>{count.current + 1}</Text>
            ) : null}
            <Image
              source={{uri: item.url}}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardDetail}>
              <Text style={styles.cardName}>{item.name}</Text>
              <View style={styles.voteView}>
                <Image source={filledStar} style={styles.star} />
                <Text style={styles.labelText}>{item.voteCount}</Text>
                <View style={styles.label2}>
                  <Text style={styles.labelText}>{item.talent}</Text>
                </View>
              </View>
            </View>
          </View>
          {count.current < 3 && (
            <View
              style={[
                styles.rightSide,
                [styles.yellow, styles.grey, styles.orange][count.current],
              ]}></View>
          )}
        </View>
        {count.current < 3 &&
          (() => {
            count.current = count.current + 1;
          })()}
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
          <Text style={[styles.nowText, styles.next]}>Leaderboard</Text>
          {leadboardStatus && (
            <View style={styles.scroll}>
              <View style={styles.first3}>
                <FlatList
                  data={first3PageantArr}
                  renderItem={card}
                  keyExtractor={item => item.id}
                />
              </View>

              <FlatList
                data={secondPageantArr}
                renderItem={card}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </ImageBackground>

      <FooterNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  first3: {
    marginBottom: 25,
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
    alignSelf: 'flex-end',
    right: -30,
    position: 'absolute',
  },
  star: {
    width: 13,
    height: 13,
    marginRight: 5,
  },
  voteView: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    position: 'relative',
  },
  place: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    width: 30,
    textAlign: 'center',
  },
  orange: {
    backgroundColor: '#CD7F32',
  },
  grey: {
    backgroundColor: '#C0C0C0',
  },
  yellow: {
    backgroundColor: '#FFD700',
  },
  rightSide: {
    width: 10,
    height: 70,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrap2: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftSide: {
    width: 10,
    height: 70,
    backgroundColor: 'red',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  scroll: {
    maxHeight: '90%',
  },
  cardDetail: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  cardName: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'interFont',
    fontSize: 13.25,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingLeft: 5,
  },
  cardImage: {
    height: '100%',
    width: '30%',
    resizeMode: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  card: {
    backgroundColor: '#000000',
    width: '85%',
    height: 70,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
  },
  next: {
    marginTop: 30,
    marginBottom: 20,
  },
  nowText: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 20,
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
