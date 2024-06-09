import {StyleSheet, View, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {Ip} from './DbIpAddress';

export const CurrentPageant = ({streamStatus}) => {
  const [pageantObj, setPageantObj] = useState({
    status: 1,
    id: 'id',
    name: 'name',
    talent: 'talend',
    performStatus: 'performedStatus',
  });
  const [performStatus, setPerformStatus] = useState(false);

  useEffect(() => {
    getDbData();
  }, []);

  const getDbData = () => {
    var form = new FormData();
    form.append('page', 1);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        var response = JSON.parse(request.responseText);
        if (response.status == 1) {
          setPageantObj(response);

          setPerformStatus(true);
        } else {
          setPerformStatus(false);
        }

        setTimeout(() => {
          getDbData();
        }, 10000);
      }
    };
    request.open('POST', Ip + '/bhawa/user/currentPageant.php', true);
    request.send(form);
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
          {performStatus ? pageantObj.name : "Haven't Started Yet !"}
        </Text>
        <Text style={[styles.nowText, styles.nowText2]}>
          {performStatus ? 'Now Performing' : "Haven't Started Yet !"}
        </Text>
      </View>
      {performStatus && (
        <View style={[styles.label2, styles.type]}>
          <Text style={styles.labelText}>{pageantObj.talent}</Text>
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
    marginTop: 20,
    justifyContent: 'space-between',
  },
  detailsMarginTop2: {
    marginTop: -70,
  },
  detailsMarginTop: {
    marginTop: 10,
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
