import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';

export const UpcommingPageant = () => {
  const [upcommingPageant, setUpcommingPageant] = useState([]);
  const [commingUpStatus, setCommingUpStatus] = useState(false);

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    fetch(Ip + '/bhawa/user/upcommingPageant.php', {
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

          setUpcommingPageant(json[1]);
          setCommingUpStatus(true);
        } else {
          setCommingUpStatus(false);
        }

        setTimeout(() => {
          getDbData();
        }, 10000);
      })
      .catch(error => Alert.alert('Error', error));
  };

  function card({item}) {
    return (
      <Pressable style={styles.card}>
        <View style={styles.cardDetail}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.label1}>
            <Text style={styles.labelText}>{item.talent}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View>
      {commingUpStatus && (
        <>
          <Text style={[styles.nowText, styles.next]}>Comming Up Next</Text>
          <View style={styles.scroll}>
            <FlatList
              data={upcommingPageant}
              renderItem={card}
              keyExtractor={item => item.id}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    maxHeight: '53.5%',
    minHeight: '53.5%',
  },
  next: {
    marginTop: 30,
  },
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
    justifyContent: 'space-between',
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardName: {
    color: '#FFF',
    textAlign: 'left',
    fontFamily: 'interFont',
    fontSize: 13.25,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingLeft: 5,
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
    height: 40,
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginBottom: 8,
    flexDirection: 'row',
    marginLeft: 10,
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
