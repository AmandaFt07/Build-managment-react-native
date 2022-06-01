import React from "react"

import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 

import db from '../firebase.config'

import { collection, updateDoc, doc } from 'firebase/firestore'


const EditBuildDetails = ({navigation, route}) => {
    const {item} = route.params
    const housesCollection = collection(db, 'houses')

    const [name, onChangeTextName] = React.useState(item.nome);
    const [tipologia, onChangeTextTipologia] = React.useState(item.tipologia);
    const [address, onChangeTextAddress] = React.useState(item.address);
    const [start, onChangeTextStart] = React.useState(item.start);
    const [end, onChangeTextEnd] = React.useState(item.end);

    const editBuildDetails = async(name, tipologia, address, start, end, id) =>{
        const build = doc(db, 'houses', id)

        await updateDoc(build, {
            nome: name,
            tipologia: tipologia,
            address: address,
            start: start,
            end: end, 
        });
        
        AlertaBox()
    }

    function AlertaBox(){
        Alert.alert(
        "Updated!",
        "",
        [
            { text: "OK"}
        ]
        );
    }

    return(
        <ScrollView style={{flex: 1, backgroundColor: "#ebebeb"}}>
            <View style={styles.header}>

                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>

                <Text style={styles.title}>EDIT</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.card}>
                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Name:</Text>
                        <TextInput 
                            value={name}
                            placeholder={item.name}
                            onChangeText={onChangeTextName}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Tipologia:</Text>
                        <TextInput 
                            value={tipologia}
                            placeholder={item.tipologia}
                            onChangeText={onChangeTextTipologia}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Address:</Text>
                        <TextInput 
                            value={address}
                            placeholder={item.address}
                            onChangeText={onChangeTextAddress}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Start:</Text>
                        <TextInput 
                            value={start}
                            placeholder={item.start}
                            onChangeText={onChangeTextStart}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>End:</Text>
                        <TextInput 
                            value={end}
                            placeholder={item.end}
                            onChangeText={onChangeTextEnd}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Pressable 
                            onPress={()=>navigation.goBack()}
                            style={styles.btn}
                        >
                            <Text style={styles.btn_text}>Cancel</Text>
                        </Pressable>
                    
                        <Pressable
                            style={styles.btn}
                            onPress={() => editBuildDetails(name, tipologia, address, start, end, item.id)}
                        >
                            <Text style={styles.btn_text}>Save</Text>
                        </Pressable>
                    </View>
                </View> 

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#490061",
        paddingVertical: 20,
        paddingHorizontal:20,
    },

    title:{
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        paddingVertical: 10,
    },

    content:{
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: "#ebebeb",
    },

    details:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    card:{
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        borderColor: "#a7adaf",
        borderWidth: 1,
    },

    input:{
        borderRadius: 5,
        padding: 5,
        borderColor: "#a7adaf",
        borderWidth: 1,
        width: 200,
    },

    buttons:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },

    btn:{
        backgroundColor: "#490061",
        borderRadius: 5,
        borderColor: "#490061",
        width: 100,
        paddingVertical: 5,
    },

    btn_text:{
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
    }
})

export default EditBuildDetails