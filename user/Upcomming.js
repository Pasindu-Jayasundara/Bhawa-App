import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';

export function Upcomming({scroll, navigation}) {
  const [upcommingPerformers, setUpcommingPerformers] = useState([]);
  const [commingUpStatus, setCommingUpStatus] = useState(false);

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState==4 && request.status==200){
        console.log(request.responseText);

        var json = JSON.parse(request.responseText);
        // console.log(json[1][0].url)
        // item.url
        if (json[0] == 1) {
          // event avaliable

          setUpcommingPerformers(json[1]);
          setCommingUpStatus(true);
        } else {
          setCommingUpStatus(false);
        }

        setTimeout(() => {
          getDbData();
        }, 10000);
      }
    };

request.open("POST",Ip+"/bhawa/user/upcomming.php",true);
request.send();

  };

  function card({item}) {
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('Live')}>
        <Image
          source={{uri: item.url}}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardDetail}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={[styles.labelView, styles.cardLabel]}>
            <View style={styles.label1}>
              <Text style={styles.labelText}>{item.type}</Text>
            </View>
            <View style={styles.label2}>
              <Text style={styles.labelText}>{item.event}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View>
      {commingUpStatus && (
        <>
          <Text style={[styles.nowText, scroll.next]}>Comming Up Next</Text>
          <View style={scroll.scroll}>
            <FlatList
              data={upcommingPerformers}
              renderItem={card}
              keyExtractor={item => item.id}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardLabel: {
    marginTop: 0,
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
  cardDetail: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  cardName: {
    color: '#FFF',
    textAlign: 'left',
    fontFamily: 'interFont',
    fontSize: 13.25,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingLeft: 5,
    paddingBottom: 10,
  },
  cardImage: {
    height: 'inherit',
    width: '38%',
    resizeMode: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  card: {
    backgroundColor: '#000000',
    width: '90%',
    height: 70,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
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
});
