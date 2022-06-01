import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';

import UserContext from "../UserContext";

import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);

    useEffect(() => {
        AsyncStorage.getItem("settings").then((val) => {
        if (val != null) setData(JSON.parse(val));
        });
    }, []);

    return(
        <View style={{flex: 1, marginTop:-5}}>
            <StatusBar hidden/>
            <DrawerContentScrollView
                {...props}
            >   
            
                <View style={styles.top_box}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={styles.background}
                    />
                    
                    <Image 
                        source={require('../assets/img/steve.jpeg')}
                        style={styles.img}
                    />

                    <Text style={styles.profile_text}>Profile Name</Text>

                </View>

                <View style={styles.bottom_box}>
                
                    <DrawerItemList {...props}/>

                    <Pressable 
                        style={styles.options}
                        onPress={() => {
                        signOut(getAuth())
                            .then(() => {
                            setLoggedUser("");
                            })
                            .catch((error) => {
                            console.log("SettingsScreen - error: ", error);
                            });
                        }}
                    >
                        
                        <Text style={{color: '#77338d', fontSize:15, textAlign: 'center'}}>Log out</Text>
                    
                    </Pressable>

                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    top_box:{
        backgroundColor: '#793b7a',
        paddingVertical: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profile_text:{
        color: '#fff',
        fontSize: 20,
    },

    img:{
        width: 130,
        height: 130,
        borderRadius:100,
        marginBottom: 20,
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },

    bottom_box:{
        paddingTop: 20,
    },

    options:{
        marginHorizontal: 20,
        marginTop:300,
        borderWidth: 2,
        borderColor: '#77338d',
        borderRadius: 5,
        paddingVertical:10,
        paddingHorizontal: 10,
        
    }
})