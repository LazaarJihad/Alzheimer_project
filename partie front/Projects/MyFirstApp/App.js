import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import UserTypeScreen from './screens/UserTypeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AcceuilPatient from './screens/AcceuilPatient';
import AcceuilAssistant from './screens/AcceuilAssistant';
import Favoris from './screens/Favoris';
import PosterAnnoncePatient from './screens/PosterAnnoncePatient';
import ProfilePatient from './screens/ProfilePatient';
import ProfileAssistant from './screens/ProfileAssistant';
import Payment from './screens/Payment';
import CartScreen from './screens/CartScreen';
import ManageTimeNote from './screens/ManageTimeNote';
import Manage from './screens/Manage';
import AfficherTask from './screens/AfficherTask';
import AddTask from './screens/AddTask';
import Panier from './screens/Panier';
import AnnoncePatient from './screens/AnnoncePatient';

import { FavoritesProvider } from './screens/FavoritesContext';
const Stack = createStackNavigator();

const App = () => {
  return (
  <FavoritesProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserType" component={UserTypeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="AnnoncePatient" component={AnnoncePatient}  options={{ headerShown: true }} />

         <Stack.Screen name="AcceuilAssistant" component={AcceuilAssistant} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AcceuilPatient" component={AcceuilPatient} options={{ headerShown: true }} />
                <Stack.Screen name="ProfileAssistant" component={ProfileAssistant} options={{ headerShown: true }} />
        <Stack.Screen name="Favoris" component={Favoris}  />
        <Stack.Screen name="PosterAnnoncePatient" component={PosterAnnoncePatient}  />
        <Stack.Screen name="ProfilePatient" component={ProfilePatient} options={{title: 'Profile' }}options={{ headerShown: true }} />
<Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }}/>
<Stack.Screen name="ManageTimeNote" component={ManageTimeNote} options={{ headerShown: false }}/>
<Stack.Screen name="Manage" component={Manage}options={{ headerShown: false }} />
<Stack.Screen name="AfficherTask" component={AfficherTask} options={{ headerShown: false }} />
<Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }} />
<Stack.Screen name="Panier" component={Panier}  />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
</FavoritesProvider>  );
};

export default App;