import React, {useState, useEffect} from 'react';

import { View, Text, StyleSheet, Pressable, TextInput , ScrollView, Alert} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

import { AntDesign } from '@expo/vector-icons'; 

import { TextInputMask } from 'react-native-masked-text'

import db from '../firebase.config'
import { collection, addDoc} from 'firebase/firestore'

const Expense = ({route, navigation}) => {
    const id = route.params.id

    const [ category, setCategory ] = useState("")
    const [start, setStart] = React.useState("")
    const [end, setEnd] = React.useState("")
    const [detail, setDetail] = useState("")
    const [preco, setPreco] = useState("")

    const categorytype = ["materials", "electrician", "painter", "plumber", "carpenter", "taxes", "others"]

    const expenseCollection = collection(db, 'expenses')

    
    const addExpense = async (id) => {
        await addDoc(expenseCollection, {
            category: category,
            start: start,
            end: end,
            detail: detail,
            total: preco,
            id_house: id,
        });
 
        AlertaBox()
    }

    function AlertaBox(){
        Alert.alert(
        "Done!",
        "A new expense created!",
        [
            { text: "OK",
           
        }
        ]
        );
    }

    return(
        <ScrollView style={{flex: 1, backgroundColor: "#ebebeb" }}>
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.title}>Adicionar</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.card}>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Category:</Text>
                        <SelectDropdown
                            data={categorytype}
                            defaultButtonText="Category"
                            buttonStyle={{width:170}}
                            onSelect={(selectedItem, index) => {
                                setCategory(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}

                            rowTextForSelection={(item, index) => {
                                return item
                            }}
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
               
                    </View> 

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Detail:</Text>
                        <TextInput 
                            value={detail}
                            onChangeText={setDetail}
                            style={styles.input}
                        />
                    </View> 

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Total €:</Text>
                        <TextInput 
                            value={preco}
                            onChangeText={setPreco}
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
                            onPress={() => addExpense(id)}
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
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 20,
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
        width: 170,
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

export default Expense