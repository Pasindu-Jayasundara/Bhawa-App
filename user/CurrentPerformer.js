import {StyleSheet, View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';

export const CurrentPerformer = ({streamStatus}) => {
  const [performeObj, setPerformeObj] = useState({});
  const [performStatus, setPerformStatus] = useState(false);

  useEffect(() => {
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
          console.log('1');

          setPerformeObj(json[1][0]);
          setPerformStatus(true);
        } else {
          setPerformStatus(false);
        }

        setTimeout(() => {
          getDbData();
        }, 10000);
      })
      .catch(error => Alert.alert('Error', error));
  };

  return (
    <View
      style={
        streamStatus
          ? [styles.details, styles.detailsMarginTop2]
          : [styles.details, styles.detailsMarginTop]
      }>
      <View>
        <Text style={styles.nowText}>
          {performStatus ? performeObj.name : "Haven't Started Yet !"}
        </Text>
        <Text style={[styles.nowText, styles.nowText2]}>
          {performStatus ? 'Now Performing' : "Haven't Started Yet !"}
        </Text>
      </View>
      {performStatus && (
        <View style={[styles.label2, styles.type]}>
          <Text style={styles.labelText}>{performeObj.event}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  detailsMarginTop: {
    marginTop: 10,
  },
  detailsMarginTop2: {
    marginTop: -70,
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
});
