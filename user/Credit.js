import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  Alert,
  RefreshControl,
  Linking,
} from 'react-native';
import backgroundImage from '../assets/images/background.png';
import linkedinImg from '../assets/images/LinkedIn.png';
import {FooterNavigation} from './FooterNavigation';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function Credit({navigation}) {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    SystemNavigationBar.leanBack();
    loadDbData();
  }, []);

  const loadDbData = () => {
    fetch(Ip + '/bhawa/user/developer.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setResponseData(json);
      })
      .catch(error => {
        Alert.alert('Error', error);
      });
  };

  function card({item}) {
    const handleLinkedInPress = () => {
      if (item.linkedIn && item.linkedInUrl) {
        Linking.openURL(item.linkedInUrl);
      }
    };

    return (
      <View style={styles.cardView}>
        <Image
          source={{uri: item.profileUrl.uri}}
          style={styles.profilePicture}
        />
        <View style={styles.text}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.title}>{item.type}</Text>
        </View>
        {item.linkedIn && (
          <Pressable onPress={handleLinkedInPress}>
            <Image source={linkedinImg} style={styles.icon} />
          </Pressable>
        )}
      </View>
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
          <Text style={styles.nowText}>Developers</Text>
          <View style={styles.scroll}>
            <FlatList
              data={responseData}
              renderItem={card}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  colors={['red', 'blue', 'green']}
                  refreshing={false}
                  onRefresh={loadDbData}
                />
              }
            />
          </View>
        </View>
      </ImageBackground>

      <FooterNavigation navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: '89%',
    marginTop: 25,
  },
  text: {
    fontFamily: 'interFont',
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'start',
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
