import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import * as firebase from "./firebase.config";

// Screen components import
import Drawer from './screens/stacks/Drawer'
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/RegisterScreen";

import UserContext from "./UserContext";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";


const Stack = createStackNavigator();
const StackEnter = createStackNavigator();


export default function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    // keep track of logged user
    onAuthStateChanged(getAuth(), (user) => {
      const usersRef = collection(getFirestore(), "users");
      const docRef = doc(usersRef, user.email);
      getDoc(docRef).then((res) => {
        setLoggedUser(res.data());
      });
    });
  }, []);

  return (
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      {!loggedUser ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SignIn'  options={{headerShown: false}} component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <StackEnter.Navigator screenOptions={{ headerShown: false }}>
            <StackEnter.Screen name="App" component={Drawer} />
          </StackEnter.Navigator>
        </NavigationContainer>
      )}
    </UserContext.Provider>
  );
}
