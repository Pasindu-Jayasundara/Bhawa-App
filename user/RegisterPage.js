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
import bgImage from '../assets/images/loginBg.png';
import logo from '../assets/images/logo.png';
import {useEffect, useState} from 'react';
import {ValidatePassword} from './ValidatePassword';
import {encrypt} from './Cypher';
import {ValidateEmail} from './ValidateEmail';
import {Ip} from './DbIpAddress';
import DeviceInfo from 'react-native-device-info';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export function RegisterPage({navigation}) {
  const [androidId, setAndroidId] = useState();
  const [deviceId, setDeviceId] = useState();
  const [uniqueId, setUniqueId] = useState();
  const [token, settoken] = useState(0);

  useEffect(() => {
    SystemNavigationBar.leanBack();
    (async () => {
      await generateDeviceTocken();
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

    // const token = androidId + '' + deviceId + '' + uniqueId;
    const token = inputValues.tg;
    const encryptToken = await encrypt(token);

    settoken(encryptToken);
  }

  const [inputValues, setInputValues] = useState({
    name: '',
    tg: '',
    password: '',
    confirmPassword: '',
  });

  const handleInput = (id, text) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [id]: text,
    }));
  };

  const reset = () => {
    setInputValues({
      name: '',
      tg: '',
      password: '',
      confirmPassword: '',
    });
  };

  const signUp = () => {
    if (
      inputValues.name != '' &&
      inputValues.tg != '' &&
      inputValues.password != '' &&
      inputValues.confirmPassword != ''
    ) {
      if (inputValues.password === inputValues.confirmPassword) {
        if (ValidatePassword(inputValues.password).isValid) {
          if (ValidateEmail(inputValues.tg).isValid) {
            (async () => {
              const pw = await encrypt(inputValues.password);
              const tg = await encrypt(inputValues.tg.toLowerCase());

              const token = inputValues.tg;
              const encryptToken = await encrypt(token);

              var form = new FormData();
              form.append("tg",tg);
              form.append("password",pw);
              form.append("token",encryptToken);
              form.append("name",inputValues.name);
              var request = new XMLHttpRequest();
              request.onreadystatechange = function(){
                if(request.readyState==4 && request.status==200){

                  var json = JSON.parse(request.responseText);

                  if (json.status == 1) {
                          // success
      
                          Alert.alert('Info', 'Registration Success');
                          reset();
                          navigation.navigate('LoginPage');
                        } else if (json.status == 2) {
                          // faild
      
                          Alert.alert('Faild', 'Please try again in few minutes');
                        } else if (json.status == 3) {
                          // already registered
      
                          Alert.alert('Warning', 'Already Registered user');
                          reset();
                          navigation.navigate('LoginPage');
                        }
                }
              };
              request.open("POST",Ip+"/bhawa/user/register.php",true);
              request.send(form);
            })();
          } else {
            Alert.alert('Info', ValidateEmail(inputValues.tg).message);
          }
        } else {
          Alert.alert('Info', ValidatePassword(inputValues.password).message);
        }
      } else {
        Alert.alert('Warning', 'Passwords Does not Match');
      }
    } else {
      Alert.alert('Warning', 'Please Fill Your Details');
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
          <Text style={styles.welcomeTitle}>Register</Text>
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.tgInput}
            placeholder="Name"
            autoCorrect={false}
            autoComplete="name"
            placeholderTextColor="grey"
            onChangeText={text => handleInput('name', text)}
            value={inputValues.name}
          />
          <TextInput
            style={[styles.tgInput, styles.pwdInput]}
            placeholder="Email Address"
            autoCorrect={false}
            placeholderTextColor="grey"
            onChangeText={text => handleInput('tg', text)}
            value={inputValues.tg}
          />
          <TextInput
            style={[styles.tgInput, styles.pwdInput]}
            placeholder="Password"
            autoCorrect={false}
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={text => handleInput('password', text)}
            value={inputValues.password}
          />
          <TextInput
            style={[styles.tgInput, styles.pwdInput]}
            placeholder="Confirm Password"
            autoCorrect={false}
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={text => handleInput('confirmPassword', text)}
            value={inputValues.confirmPassword}
          />
        </View>

        <View>
          <Pressable style={styles.pressable} onPress={signUp}>
            <Text style={styles.btnText}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable, styles.pressable2]}
            onPress={() => navigation.navigate('LoginPage')}>
            <>
              <Text style={[styles.btnText, styles.btnText2, styles.btnText3]}>
                Already have an account?
              </Text>
              <Text style={[styles.btnText, styles.btnText2]}> SignIn</Text>
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
    marginTop: 20,
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
    height: '35.5%',
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
    bottom: -70,
    alignSelf: 'center',
  },
  login: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 130,
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
    marginTop: 50,
  },
  pressable2: {
    backgroundColor: 'transparent',
    marginTop: 40,
    height: '20px',
    flexDirection: 'row',
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
