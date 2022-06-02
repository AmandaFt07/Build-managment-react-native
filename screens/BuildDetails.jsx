import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, Image, StyleSheet, ScrollView, Alert, ActivityIndicator  } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import db from '../firebase.config'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

const BuildDetails = ({route, navigation}) => {
    const {id} = route.params

    const [build, setBuild] = useState([])
    const housesCollection = collection(db, 'houses')

    const [onebuild, setOnebuild ] = useState([])
    
    useEffect(()=> {
        const gethouses =  async() => {
            const data = await getDocs(housesCollection)
            setBuild(data.docs.map((doc) => ( {...doc.data(), id: doc.id } )))   
        }
        
        build.map((item) => {
            if (id === item.id){
                setOnebuild(item)
            }
        })
        
        gethouses() 
        
    }, [build])


    const deleteBuild = async(id) => {
        const build = doc(db, 'houses', id)
        await deleteDoc(build)

        createButtonAlert()
    }

    const createTwoButtonAlert = (id) =>
        Alert.alert(
        "Alert Mesage!",
        "Are you sure you want to delete?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => deleteBuild(id) }
        ]
    );

    function createButtonAlert(){
        Alert.alert(
        "Deleted!",
        "",
        [
            { text: "OK"}
        ]
        );
    }


    return( 
        <ScrollView>
             
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.title}>BUILD DETAILS</Text>
            </View>

            {
                onebuild.length === 0? 

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#710096"/>
                </View>

                :

                <View style={styles.content}>

                    <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                        <Pressable onPress={() => createTwoButtonAlert(id)}>
                            <Text style={styles.edit_text}>Deletar</Text>
                        </Pressable>

                        <Pressable onPress={()=> navigation.navigate("Edit Build", {item: onebuild})}>
                            <Text style={styles.edit_text}>Editar</Text>
                        </Pressable>

                    </View>

                    {/* <Image style={styles.img} source={{uri:item.photo}}/> */}

                    <View style={styles.card}>
                        <View style={styles.details}>
                            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Name:</Text>
                            <Text style={{fontSize: 16}}>{onebuild.nome}</Text>
                        </View>

                        <View style={styles.details}>
                            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Tipologia:</Text>
                            <Text style={{fontSize: 16}}>{onebuild.tipologia}</Text>
                        </View>

                        <View style={styles.details}>
                            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Address:</Text>
                            <Text style={{fontSize: 16}}>{onebuild.address}</Text>
                        </View>

                        <View style={styles.details}>
                            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Start:</Text>
                            <Text style={{fontSize: 16}}>{onebuild.start}</Text>
                        </View>

                        <View style={styles.details}>
                            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>End:</Text>
                            <Text style={{fontSize: 16}}>{onebuild.end}</Text>
                        </View>
                    </View>

                    <Pressable onPress={()=>navigation.navigate("Expenses Details", {id:onebuild.id})} style={styles.total}>
                        <Text style={{color:"#6d0091", fontWeight:'bold', fontSize:18}}>Despesas</Text>
                        <AntDesign name="arrowright" size={24} color="#710096" />
                    </Pressable> 
                </View> 
        
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#490061",
        paddingVertical: 20,
        paddingHorizontal:20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    title:{
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        paddingVertical: 10,
    },

    content:{
        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    edit_text:{
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 10,
        marginBottom: 20,
    },  

    img:{
        width: '100%',
        height: 200,
    },

    card:{
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        borderColor: "#a7adaf",
        borderWidth: 1,
    },

    details:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    total:{
        backgroundColor: "#fff",
        borderColor:"#98ccd3",
        borderWidth: 2,
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default BuildDetails