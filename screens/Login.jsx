import React, { useState, useContext } from "react";

import { Text, View, TextInput, Pressable, Image, StyleSheet  } from 'react-native'


import UserContext from "../UserContext";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, getFirestore, doc, getDoc } from "firebase/firestore";


export default function Login({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const loginPress = () => {
        // Login
        signInWithEmailAndPassword(getAuth(), email, password)
        .then((res) => {

            // Obter documento
            const usersRef = collection(getFirestore(), "users");
            const docRef = doc(usersRef, res.user.email);
            getDoc(docRef).then((res) => {

            setLoggedUser(res.data());
            });
        })
        .catch((error) => setErrorMessage(error.code));
    };

    return(
        <View style={styles.backgroundPurple}>
            <View style={styles.container}>

                <Image
                    source={require("../assets/img/house.jpeg")}
                    style={styles.img}
                />
                
                <View style={styles.card}>
                    <TextInput
                        style={[styles.input, {marginBottom: 20}]}
                        autoCapitalize="none"
                        placeholder="Email"
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
                    
                    <Pressable style={[styles.button, {marginBottom: 20}] } onPress={loginPress}>
                        <Text style={styles.button_text}>Submit</Text>
                    </Pressable >

                    <Pressable  style={styles.button } onPress={() => { navigation.navigate("Register") }}>
                        <Text style={styles.button_text}>Register</Text>
                    </Pressable >

                </View>

            </View>
        </View>
    )
}


 const styles = StyleSheet.create({
    backgroundPurple:{
        backgroundColor: "#77338d",
        flex: 1,
    },

    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    img:{
        borderRadius: 100,
        width:150 ,
        height:150,
        marginBottom: 50,
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
        backgroundColor: "#710096",
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



