import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import backgroundImage from '../assets/images/background.png';
import {FooterNavigation} from './FooterNavigation';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import {useEffect} from 'react';

export function About({navigation}) {
  useEffect(() => {
    SystemNavigationBar.leanBack();
  }, []);

  const paragraphs = [
    'The Bhawa Talent Show at the University of Ruhuna Technology Faculty is an annual event that showcases the diverse talents of students within the university community.',
    '',
    'From captivating performances in music, dance, and drama to impressive displays of artistic skills, the talent show provides a platform for students to express their creativity and passion. It fosters a vibrant and supportive atmosphere, celebrating the rich talents that contribute to the cultural and artistic tapestry of the university. ',
    '',
    "The Bhawa Talent Show serves as a unifying experience, bringing together students and faculty to appreciate and applaud the unique skills and talents of the university's creative minds..",
  ];

  const formattedText = paragraphs.join('\n');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <Text style={styles.nowText}>About Us</Text>
          <View style={styles.profile}>
            <Image
              source={require('../assets/images/logo.png')}
              resizeMode="cover"
              style={styles.profileImage}
            />
            <Text style={styles.name}>Bhawa</Text>
          </View>
          <View style={styles.cardView}>
            <ScrollView
              style={styles.scroll}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.paragraph}>{formattedText}</Text>
            </ScrollView>

            <View style={styles.first3}>
              <Pressable
                style={styles.card}
                onPress={() => navigation.navigate('Credit')}>
                <Text style={[styles.text, styles.text3]}>Developers</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>

      <FooterNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  scroll: {
    height: '35%',
    marginBottom: 30,
  },
  paragraph: {
    color: '#D9D9D9',
    fontFamily: 'interFont',
    fontSize: 12,
    textAlign: 'justify',
    maxWidth: '95%',
    alignSelf: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  text: {
    color: '#5BD7FF',
    fontFamily: 'interFont',
    fontSize: 13.5,
    fontStyle: 'normal',
    fontWeight: '400',
    marginLeft: 10,
    borderBottomColor: '#444446',
    borderBottomWidth: 1.5,
    width: '90%',
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
    height: 80,
    borderRadius: 7,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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
    color: '#5BD7FF',
    fontFamily: 'interFont',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginTop: 20,
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
