import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useEffect, useState, useRef} from 'react';
import backgroundImage from '../assets/images/background.png';
// import camera from '../assets/images/camera2.svg';
// import name from '../assets/images/at.svg';
// import password from '../assets/images/password.svg';
// import ticket from '../assets/images/ticket.svg';
// import logout from '../assets/images/logout.svg';
// import info from '../assets/images/about.svg';

import camera from '../assets/images/newCamera.png';
import name from '../assets/images/newAt.png';
import password from '../assets/images/newPassword.png';
import ticket from '../assets/images/newTicket.png';
import logout from '../assets/images/newLogout.png';
import info from '../assets/images/newAboutus.png';

import {FooterNavigation} from './FooterNavigation';
import * as Progress from 'react-native-progress';
import EncryptedStorage from 'react-native-encrypted-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SvgUri from 'react-native-svg-uri-maintained';
import {Ip} from './DbIpAddress';
import {ValidatePassword} from './ValidatePassword';
import {encrypt} from './Cypher';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function Setting({navigation}) {
  const [profileImage, setProfileImage] = useState();

  const [shoOptionState, setShowOptionState] = useState({
    image: false,
    name: false,
    password: false,
  });
  const [showPrograssBarState, setShowPrograssBarState] = useState(false);
  const [prograss, setPrograss] = useState(0);
  const [user, setUser] = useState();
  const [userName, setuserName] = useState('aaaaa');
  const [userId, setUserId] = useState();

  const nameText = useRef('');
  const newPassword = useRef('');
  const newConfirmPassword = useRef('');

  useEffect(() => {
    SystemNavigationBar.leanBack();
    (async () => {
      const u = await EncryptedStorage.getItem('user');
      const uu = JSON.parse(u);

      setUser(uu);
      setuserName(uu.name);
      setUserId(uu.uId);
      if (uu.profileImage.startsWith('../')) {
        setProfileImage(uu.profileImage.replace(/^\.\.\//, Ip + '/bhawa/'));
      } else {
        setProfileImage(uu.profileImage);
      }
    })();
  }, []);

  const changeUpdateOptionState = (key, value) => {
    setShowOptionState(prevValue => ({
      ...prevValue,
      [key]: value,
    }));
  };

  // .................. update password ............................. //

  const updatePassword = () => {
    if (ValidatePassword(newConfirmPassword.current).isValid) {
      if (
        newPassword.current === newConfirmPassword.current &&
        newConfirmPassword.current.trim() != ''
      ) {
        (async () => {
          const pw = await encrypt(newPassword.current);

          var form = new FormData();
          form.append('password', pw);
          form.append('uId', userId);
          var request = new XMLHttpRequest();
          request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
              var response = JSON.parse(request.responseText);
              if (response == 1) {
                // success

                newPassword.current = '';
                newConfirmPassword.current = '';
                changeUpdateOptionState('password', false);

                ToastAndroid.show(
                  'Password Update Success',
                  ToastAndroid.SHORT,
                );
              } else {
                Alert.alert('Error', 'Name Update Falier');
              }
            }
          };
          request.open('POST', Ip + '/bhawa/user/updatePassword.php', true);
          request.send(form);
        })();
      }
    } else {
      Alert.alert('Info', ValidatePassword(newConfirmPassword.current).message);
    }
  };

  const ProfilePasswordModalDesign = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={shoOptionState.password}
        onRequestClose={() =>
          changeUpdateOptionState('name', !shoOptionState.password)
        }>
        <TouchableWithoutFeedback
          onPress={() => {
            newPassword.current = '';
            newConfirmPassword.current = '';
            changeUpdateOptionState('password', !shoOptionState.password);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.tgInput}
                placeholder="New Password"
                autoCorrect={false}
                placeholderTextColor="grey"
                onChangeText={text => (newPassword.current = text)}
                secureTextEntry={true}
              />
              <TextInput
                style={[styles.tgInput, styles.tgInputpw2]}
                placeholder="Confirm New Password"
                autoCorrect={false}
                placeholderTextColor="grey"
                onChangeText={text => (newConfirmPassword.current = text)}
                secureTextEntry={true}
              />
              <Pressable style={styles.pressable} onPress={updatePassword}>
                <Text style={styles.btnText}>Update Password</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  // .................. update name ............................. //

  const updateName = () => {
    if (nameText.current.trim() != '') {
      fetch(Ip + '/bhawa/user/updateName.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uId: userId,
          name: nameText.current,
        }),
      })
        .then(response => response.json())
        .then(json => {
          if (json == 1) {
            // success
            (async () => {
              try {
                await EncryptedStorage.removeItem('user');
                await EncryptedStorage.setItem(
                  'user',
                  JSON.stringify({
                    name: nameText.current,
                    profileImage: user.profileImage,
                    ticketNumber: user.ticketNumber,
                    paid: user.paid,
                    uId: user.uid,
                    tg: user.tg,
                  }),
                );
                setUser({
                  name: nameText.current,
                  profileImage: user.profileImage,
                  ticketNumber: user.ticketNumber,
                  paid: user.paid,
                  uId: user.uid,
                  tg: user.tg,
                });

                setuserName(nameText.current);
                nameText.current = '';
                changeUpdateOptionState('name', false);
                ToastAndroid.show(
                  'Account Name Update Success',
                  ToastAndroid.SHORT,
                );
              } catch (error) {
                Alert.alert('Error', error);
              }
            })();
          } else {
            Alert.alert('Error', 'Name Update Falier');
          }
        })
        .catch(error => {
          Alert.alert('Error', error);
        });
    }
  };

  const ProfileNameModalDesign = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={shoOptionState.name}
        onRequestClose={() =>
          changeUpdateOptionState('name', !shoOptionState.name)
        }>
        <TouchableWithoutFeedback
          onPress={() => {
            nameText.current = '';
            changeUpdateOptionState('name', !shoOptionState.name);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.tgInput}
                placeholder="Name"
                autoCorrect={false}
                autoComplete="name"
                placeholderTextColor="grey"
                onChangeText={text => (nameText.current = text)}
              />
              <Pressable style={styles.pressable} onPress={updateName}>
                <Text style={styles.btnText}>Update Name</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  // .................. update image ............................. //

  const openCamera = async () => {
    const image = await launchCamera();
    if (!image.didCancel) {
      uploadProfileImage(image);
    }
  };

  const launchFile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      image => {
        if (!image.didCancel) {
          uploadProfileImage(image);
        }
      },
    );
  };

  const uploadProfileImage = image => {
    changeUpdateOptionState('image', !shoOptionState.image);
    setShowPrograssBarState(true);

    var form = new FormData();
    form.append('file', {
      uri: image.assets[0].uri,
      type: image.assets[0].type,
      name: image.assets[0].fileName,
    });
    form.append('uId', userId);

    var request = new XMLHttpRequest();

    request.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        var percentComplete = event.loaded / event.total;
        setPrograss(percentComplete);
      }
    };

    request.onload = function () {
      if (request.status === 200 && request.readyState == 4) {
        setPrograss(1);

        console.log(request.responseText);
        var response = JSON.parse(request.responseText);

        setShowPrograssBarState(false);

        if (response.status == 5) {
          (async () => {
            try {
              await EncryptedStorage.removeItem('user');
              await EncryptedStorage.setItem(
                'user',
                JSON.stringify({
                  name: user.name,
                  profileImage: Ip + '/bhawa' + response.link,
                  ticketNumber: user.ticketNumber,
                  paid: user.paid,
                  uId: user.uid,
                  tg: user.tg,
                }),
              );
              setUser({
                name: user.name,
                profileImage: response.link,
                ticketNumber: user.ticketNumber,
                paid: user.paid,
                uId: user.uid,
                tg: user.tg,
              });

              setProfileImage(Ip + '/bhawa' + response.link);
              ToastAndroid.show(
                'Profile Image Update Success',
                ToastAndroid.SHORT,
              );
            } catch (error) {
              Alert.alert('Error', error);
            }
          })();
        } else {
          Alert.alert('Error', 'Profile Image Updating Faild');
        }
      } else {
        Alert.alert('Error', 'Error uploading data and image.');
      }
    };

    request.open('POST', Ip + '/bhawa/user/updateProfileImage.php', true);
    request.send(form);
  };

  const ProfileImageModalDesign = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={shoOptionState.image}
        onRequestClose={() =>
          changeUpdateOptionState('image', !shoOptionState.image)
        }>
        <TouchableWithoutFeedback
          onPress={() =>
            changeUpdateOptionState('image', !shoOptionState.image)
          }>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={openCamera}>
                <Image
                  source={require('../assets/images/camera.png')}
                  style={styles.modelIcon1}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable onPress={launchFile}>
                <Image
                  source={require('../assets/images/folder.png')}
                  style={styles.modelIcon2}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const PrograssbarDesign = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPrograssBarState}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Progress.Bar progress={prograss} width={200} />
          </View>
        </View>
      </Modal>
    );
  };

  const logOut = () => {
    (async () => {
      try {
        await EncryptedStorage.removeItem('user');
        navigation.navigate('WelcomePage');

        ToastAndroid.show('Logged Out !', ToastAndroid.SHORT);
      } catch (error) {
        Alert.alert('Error', error);
      }
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <Text style={styles.nowText}>Settings</Text>
          <View style={styles.profile}>
            <Image
              source={{uri: profileImage}}
              resizeMode="cover"
              style={styles.profileImage}
            />
            <Text style={styles.name}>{userName}</Text>
          </View>
          <View style={styles.cardView}>
            <View style={styles.first3}>
              <Pressable
                style={styles.card}
                onPress={() =>
                  changeUpdateOptionState('image', !shoOptionState.image)
                }>
                <Image source={camera} style={styles.icon} />
                <Text style={styles.text}>Change Profile picture</Text>
              </Pressable>
              <Pressable
                style={styles.card}
                onPress={() =>
                  changeUpdateOptionState('name', !shoOptionState.name)
                }>
                <Image source={name} style={styles.icon} />
                <Text style={styles.text}>Change Name</Text>
              </Pressable>
              <Pressable
                style={styles.card}
                onPress={() =>
                  changeUpdateOptionState('password', !shoOptionState.password)
                }>
                <Image source={password} style={styles.icon} />
                <Text style={[styles.text, styles.text3]}>Change Password</Text>
              </Pressable>
            </View>

            <View style={styles.second3}>
              <Pressable
                style={[styles.card, styles.card2]}
                onPress={() => navigation.navigate('Ticket')}>
                <Image source={ticket} style={styles.icon} />
                <Text style={[styles.text, styles.underline]}>Ticket</Text>
              </Pressable>
              <Pressable style={[styles.card, styles.card2]} onPress={logOut}>
                <Image source={logout} style={styles.icon} />
                <Text style={[styles.text, styles.underline]}>Log out</Text>
              </Pressable>
              <Pressable
                style={[styles.card, styles.card2]}
                onPress={() => navigation.navigate('About')}>
                <Image source={info} style={styles.icon} />
                <Text style={[styles.text, styles.underline]}>About Us</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <ProfileImageModalDesign />
        <PrograssbarDesign />
        <ProfileNameModalDesign />
        <ProfilePasswordModalDesign />
      </ImageBackground>

      <FooterNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: 'white',
  },
  pressable: {
    width: 280,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#444446',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'interFont',
    marginTop: 35,
  },
  tgInput: {
    width: 280,
    fontFamily: 'interFont',
    color: 'black',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#1C1C1E',
  },
  tgInputpw2: {
    marginTop: 10,
  },
  modelIcon1: {
    width: 40,
  },
  modelIcon2: {
    width: 37,
    marginTop: -5,
    marginLeft: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'column',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  card2: {
    borderRadius: 7,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 3.5,
  },
  underline: {
    borderBottomWidth: 0,
  },
  second3: {
    width: '90%',
    height: 145,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    color: '#D9D9D9',
    fontFamily: 'interFont',
    fontSize: 13.5,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
    borderBottomColor: '#444446',
    borderBottomWidth: 1.5,
    width: '85%',
    paddingBottom: 5,
  },
  text3: {
    borderBottomWidth: 0,
  },
  card: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 10,
  },
  first3: {
    width: '90%',
    height: 135,
    borderRadius: 7,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 7,
  },
  cardView: {
    alignItems: 'center',
    marginTop: 25,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 8,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  nowText: {
    color: '#FFF',
    fontFamily: 'interFont',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingLeft: 12,
    marginTop: 22,
    marginBottom: 30,
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
