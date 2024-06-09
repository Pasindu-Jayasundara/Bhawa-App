import {WelcomePage} from './user/WelcomePage';
import {LoginPage} from './user/LoginPage';
import {RegisterPage} from './user/RegisterPage';
import {Home} from './user/Home';
import {Leadboard} from './user/Leadboard';
import {Setting} from './user/Setting';
import {About} from './user/About';
import {Credit} from './user/Credit';
import {Live} from './user/Live';
import {Ticket} from './user/Ticket';
import { Define } from './user/Define';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Vote } from './user/Vote';

const Stack = createNativeStackNavigator();

function BhawaApp() {

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Define'} >
        <Stack.Screen options={{ headerShown: false }} name="WelcomePage" component={WelcomePage} />
        <Stack.Screen options={{ headerShown: false }} name="LoginPage" component={LoginPage} />
        <Stack.Screen options={{ headerShown: false }} name="RegisterPage" component={RegisterPage} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Setting" component={Setting} />
        <Stack.Screen options={{ headerShown: false }} name="Leadboard" component={Leadboard} />
        <Stack.Screen options={{ headerShown: false }} name="About" component={About} />
        <Stack.Screen options={{ headerShown: false }} name="Credit" component={Credit} />
        <Stack.Screen options={{ headerShown: false }} name="Live" component={Live} />
        <Stack.Screen options={{ headerShown: false }} name="Ticket" component={Ticket} />
        <Stack.Screen options={{ headerShown: false }} name="Vote" component={Vote} />
        <Stack.Screen options={{ headerShown: false }} name="Define" component={Define} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default BhawaApp;