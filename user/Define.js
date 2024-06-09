import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';

export const Define = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserAndNavigate = async () => {
      try {
        const user = await EncryptedStorage.getItem("user");

        if (user !== null && user !== undefined) {
          // User exists, navigate to Home
          navigation.navigate('Home');
        } else {
          // User does not exist, navigate to WelcomePage
          navigation.navigate('WelcomePage');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkUserAndNavigate();
  }, [navigation]);

  // You can render UI here if needed
  return null;
};
