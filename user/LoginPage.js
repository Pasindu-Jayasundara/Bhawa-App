import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import {useEffect, useState} from 'react';
import bgImage from '../assets/images/loginBg.png';
import logo from '../assets/images/logo.png';
import {ValidatePassword} from './ValidatePassword';
import EncryptedStorage from 'react-native-encrypted-storage';
import {encrypt} from './Cypher';
import {ValidateEmail} from './ValidateEmail';
import {Ip} from './DbIpAddress';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function LoginPage({navigation}) {
  useEffect(() => {
    SystemNavigationBar.leanBack();
  }, []);

  const [inputValues, setInputValues] = useState({
    tgNumber: '',
    password: '',
  });

  const handleInputChange = (key, text) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [key]: text,
    }));
  };

  const reset = () => {
    setInputValues({
      tgNumber: '',
      password: '',
    });
  };

  const login = () => {
    const obj = ValidatePassword(inputValues.password);
    const emailobj = ValidateEmail(inputValues.tgNumber);

    if (obj.isValid) {
      if (emailobj.isValid) {
        // valid

        (async () => {
          const pw = await encrypt(inputValues.password);
          const tg = await encrypt(inputValues.tgNumber.toLowerCase());

          fetch(Ip + '/bhawa/user/login.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tg: tg,
              password: pw,
            }),
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) {
                // login success

                (async () => {
                  try {
                    await EncryptedStorage.setItem(
                      'user',
                      JSON.stringify({
                        name: json.name,
                        profileImage: json.profileImage,
                        ticketNumber: json.ticketNumber,
                        paid: json.paid,
                        uId: json.uId,
                        tg: json.tg,
                      }),
                    );

                    reset();
                    navigation.navigate('Home');
                  } catch (error) {
                    Alert.alert('Error', error);
                  }
                })();
              } else if (json.status == 2) {
                // login faild
                Alert.alert('Error !', 'LogIn Faild');
              }
            })
            .catch(error => {
              // fetch error
              Alert.alert('Error', error);
            });
        })();
      } else {
        Alert.alert('Invalid Email Address', emailobj.message);
      }
    } else {
      Alert.alert('Invalid Password', obj.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.bgImageView}>
        <Image source={bgImage} style={styles.bgImage} />
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.login}>
        <View style={styles.welcomeTitleView}>
          <Text style={styles.welcomeTitle}>Welcome Back 👋</Text>
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.tgInput}
            placeholder="Email Address"
            autoCorrect={false}
            placeholderTextColor="grey"
            onChangeText={text => handleInputChange('tgNumber', text)}
            value={inputValues.tgNumber}
          />
          <TextInput
            style={[styles.tgInput, styles.pwdInput]}
            placeholder="Password"
            autoCorrect={false}
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={text => handleInputChange('password', text)}
            value={inputValues.password}
          />
        </View>

        <View>
          <Pressable style={styles.pressable} onPress={login}>
            <Text style={styles.btnText}>Log In</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable, styles.pressable2]}
            onPress={() => navigation.navigate('RegisterPage')}>
            <>
              <Text style={[styles.btnText, styles.btnText2, styles.btnText3]}>
                Do not have an account?
              </Text>
              <Text style={[styles.btnText, styles.btnText2]}> SignUp</Text>
            </>
          </Pressable>
        </View>
      </View>

      <View style={styles.homeIndicator}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnText3: {
    color: 'grey',
  },
  inputs: {
    marginTop: 30,
  },
  pwdInput: {
    marginTop: 8,
  },
  tgInput: {
    backgroundColor: '#1C1C1E',
    width: 280,
    fontFamily: 'interFont',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 0,
  },
  bgImageView: {
    height: '48%',
    position: 'relative',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    position: 'absolute',
    bottom: -80,
    alignSelf: 'center',
  },
  login: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  welcomeTitleView: {
    flexDirection: 'row',
    marginTop: -80,
    marginBottom: 10,
  },
  welcomeTitle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'interFont',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  pressable: {
    width: 280,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#444446',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'interFont',
    marginBottom: -25,
    marginTop: 35,
  },
  pressable2: {
    background: '',
    marginTop: 40,
    height: '20px',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  btnText: {
    color: 'white',
  },
  btnText2: {
    color: 'white',
    fontSize: 13,
  },
  homeIndicator: {
    width: '130px',
    height: '2px',
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: -25,
  },
});
