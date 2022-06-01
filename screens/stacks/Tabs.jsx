import React from 'react';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text, StyleSheet } from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons'; 

import { MainStackNavigator, AddStackNavigator } from './Stacks';

const Tab = createBottomTabNavigator()

export default function NavTab(){

    return(
       
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
            }}
        >
            <Tab.Screen name="Home Tab" component={ MainStackNavigator }  
                options={{
                    tabBarIcon: ({focused}) => {
                        return <View style={{ alignItems:'center', justifyContent: 'center', height:'90%', width: '70%', borderRadius:10}}>
                            <View >
                                <AntDesign  name="home"  style={{color: focused? '#710096' : '#cecccc', fontSize: focused? 26 : 24}}/>
                            </View>
                        </View>;
                    },
                    headerShown:false
                }}
            />
            <Tab.Screen name="Add House" component={ AddStackNavigator }
                options={{
                    tabBarIcon: ({focused}) => {
                        return <View style={{ alignItems:'center', justifyContent: 'center', height:'90%', width: '70%', borderRadius:10}}>
                            <View >
                                <Ionicons name="add-outline"  style={{color: focused? '#710096' : '#cecccc', fontSize: focused? 26 : 24}} />
                            </View>
                        </View>;
                    },
                    headerShown:false
                }}
            />
        </Tab.Navigator>
      
    )
}

// NavTab.contextType = AuthContext;