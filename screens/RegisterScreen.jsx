import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";

import UserContext from "../UserContext";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { collection, getFirestore, doc, setDoc } from "firebase/firestore";


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loggedUser, setLoggedUser] = useContext(UserContext);

  const onRegisterPress = () => {
    const usersRef = collection(getFirestore(), "users");

    if (password === confirmPassword) {
      createUserWithEmailAndPassword(getAuth(), email, password)
        .then((res) => {
          const user = {
            id: res.user.uid,
            name: name,
            bio: bio,
            email: res.user.email,
          
          };

          setDoc(doc(usersRef, user.email), user).then((res) => {
            setLoggedUser(user);
          });

        })
        .catch((error) => setErrorMessage(error.code));
    } else {
      setErrorMessage("Passwords do not match!");
    }

    // const user = users
    //     .find(p => p.username === username && p.password === password);
    // if (user) {
    //     setLoggedUser(user);
    // }
    // else {
    //     setErrorMessage('Invalid credentials!');
    // }
  };

  return (
    <View style={styles.backgroundPurple}>
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold', marginBottom:20}}>Register</Text>

        <View style={styles.card}>
            
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Name"
              value={name}
              onChangeText={(val) => {
                setName(val);
                setErrorMessage("");
              }}
            />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Bio"
              value={bio}
              onChangeText={(val) => {
                setBio(val);
                setErrorMessage("");
              }}
            />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="E-Mail"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                setErrorMessage("");
              }}
            />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                setErrorMessage("");
              }}
            />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
                setErrorMessage("");
              }}
            />
            <Pressable onPress={onRegisterPress}  style={[styles.button, { marginTop: 20}] } >
              <Text style={styles.button_text} >Register</Text>
            </Pressable>

            <Text >{errorMessage}</Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{fontSize:18, marginBottom:8}}>Already registered?</Text>
              
              <Pressable  onPress={() => { navigation.navigate("SignIn")}}  style={[styles.button, {paddingHorizontal: 20}] } >
                <Text style={styles.button_text} >Sign in</Text>
              </Pressable>
              
            </View>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPurple:{
      backgroundColor: "#86add2",
      flex: 1,
  },

  container:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
  },

  card:{
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 20,
      width: 300,
  },

  input:{
      borderColor: "#686666",
      borderRadius: 5,
      borderWidth: 1,
      height: 50,
      marginBottom: 15,
      padding: 10,
  },

  button:{
      borderRadius: 5,
      backgroundColor: "#3275b5",
      padding: 8,
      marginBottom: 5,
  },

  button_text:{
      color: "#fff",
      fontSize: 15,
      textAlign: "center",
  },

  
  register_text:{
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginBottom: 20,
  },

  registerbox:{
     
      justifyContent: "center",
      position: "absolute",
      top: 365,
      backgroundColor:"#d8ecea",
      padding:  21,
      borderRadius: 5,
      borderColor: "#710096",
      borderWidth: 2,
      width: 280,
  }
})
export default RegisterScreen;
