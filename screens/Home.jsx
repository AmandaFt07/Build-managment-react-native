import React , { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator, ScrollView , RefreshControl } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 

import db from '../firebase.config'
import { collection, getDocs } from 'firebase/firestore'


export default function Home({navigation}){
    const [build, setBuild] = useState([])
    const housesCollection = collection(db, 'houses')

    useEffect(()=> {
        const gethouses =  async() => {
            const data = await getDocs(housesCollection)
            setBuild(data.docs.map((doc) => ( {...doc.data(), id: doc.id } )))
        }
        gethouses()
    }, [])

    const [refreshing, setRefreshing] = React.useState(false);

    const gethouses =  async() => {
        const data = await getDocs(housesCollection)
        setBuild(data.docs.map((doc) => ( {...doc.data(), id: doc.id } )))
    }
    
    const onRefresh = () => {
      setRefreshing(true);
      gethouses()
      setRefreshing(false)
    }

    return(
        <ScrollView
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
            <View style={styles.box_title}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={styles.background}
                />
                <Text style={styles.title}>My Builds</Text>
            </View>

            {
                build.length === 0?

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#710096"/>
                    </View>
                
                :

                <FlatList
                    data={build}
                    keyExtractor={item=> item.id}
                    renderItem={({item, index})=>(
                        <Pressable onPress={( ) => navigation.navigate("Build Details", {id: item.id})}  style={index % 2 == 0?[{backgroundColor:'#fff'}, styles.pressable]:[{backgroundColor:'#e2d4e2'}, styles.pressable]}>
                            <Text style={styles.text}>{item.nome}</Text>
                            <AntDesign name="arrowright" size={24} color="#710096" />
                        </Pressable>
                    )}
                />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    box_title:{
        backgroundColor: "#710096",
        paddingVertical: 20,
    },

    title:{
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
    },


    pressable:{
        padding: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    text:{
        fontSize: 20,
        color: '#000',
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
})