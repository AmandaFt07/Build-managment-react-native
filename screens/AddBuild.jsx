import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

import { TextInputMask } from 'react-native-masked-text'

import db from '../firebase.config'
import { collection, addDoc} from 'firebase/firestore'


export default function AddHouse({navigation}){
    const [photo, setPhoto] = React.useState("")
    const [name, setName] = React.useState("")
    const [tipologia, setTipologia] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")

    const housesCollection = collection(db, 'houses')


    const addTask = async() => {

        await addDoc(housesCollection, {
            nome: name,
            tipologia: tipologia,
            address: address,
            start: start,
            end: end, 
        });
          
        AlertaBox()
  
    }

    const AlertaBox = () =>
        Alert.alert(
        "Saved!",
        "",
        [
            { text: "OK" }
        ]
    );
 
    return(
        <ScrollView style={{flex: 1, backgroundColor: "#ebebeb"}}>
            <View style={styles.box_title}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                    style={styles.background}
                />
                <Text style={styles.title}>Add build</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.card}>

                    {/* <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Photo:</Text>
                        <TextInput
                            value={}
                            placeholder='Update Photo'
                            onChangeText={setName}
                            style={styles.input}
                        />
                    </View> */}

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Name:</Text>
                        <TextInput
                            value={name}
                            placeholder='Build name'
                            onChangeText={setName}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Tipologia:</Text>
                        <TextInput
                            value={tipologia}
                            placeholder='Tipologia'
                            onChangeText={setTipologia}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Address:</Text>
                        <TextInput
                            value={address}
                            placeholder='Endereço'
                            onChangeText={setAddress}
                            style={styles.input}
                        />
                    </View>

                    
                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Start:</Text>
                        <TextInputMask
                            type={'datetime'}
                            style={styles.input}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={start}
                            onChangeText={setStart}
                            placeholder='DD/MM/YYYY'
                        />
                        
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>End:</Text>
                        
                        <TextInputMask
                            type={'datetime'}
                            style={styles.input}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            value={end}
                            onChangeText={setEnd}
                            placeholder='DD/MM/YYYY'
                        />
                        
                        {/* <TextInput
                            value={end}
                            placeholder='Finish date'
                            onChangeText={setEnd}
                            style={styles.input}
                        /> */}
                    </View>

                    <View style={styles.buttons}>
                    
                        <Pressable
                            style={styles.btn}
                            onPress={addTask}
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
    box_title:{
        backgroundColor: "#710096",
        paddingVertical: 20,
    },

    title:{
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },

    content:{
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: "#ebebeb"
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
        justifyContent: 'space-between',
        marginBottom: 20,
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