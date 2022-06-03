import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput , ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import SelectDropdown from 'react-native-select-dropdown'

import { TextInputMask } from 'react-native-masked-text'

import db from '../firebase.config'
import { updateDoc, doc } from 'firebase/firestore'


const Expense = ({route, navigation}) => {
    const {exp} = route.params
    const categorytype = ["materials", "electrician", "painter", "plumber", "carpenter", "taxes", "others"]

    const [category, setCategory] = useState( exp.category )
    const [start, setStart] = React.useState(exp.start)
    const [end, setEnd] = React.useState(exp.end)
    const [detail, setDetail] = useState(exp.detail)
    const [preco, setPreco] = useState(exp.total)


    const editExpense = async(category, start, end, detail, preco, id, id_house) => {
        const expense = doc(db, 'expenses', id)

        await updateDoc(expense, {
            category: category,
            start: start,
            end: end,
            detail: detail,
            total: preco,
            id_house: id_house,
        });

        AlertaBox()

    }

    function AlertaBox(){
        Alert.alert(
        "Updated!",
        "",
        [
            { 
                text: "OK",
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
                <Text style={styles.title}>Editar</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.card}>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Categoria:</Text>
                        
                        <SelectDropdown
                            data={categorytype}
                            defaultButtonText={exp.category}
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
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Detail:</Text>
                        <TextInput 
                            value={detail}
                            placeholder={exp.detail}
                            onChangeText={setDetail}
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
                            placeholder={exp.start}
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
                            placeholder={exp.end}
                        />
                        
                    </View> 

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Preço:</Text>
                        <TextInput 
                            value={preco}
                            placeholder={exp.total}
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
                            onPress={() => editExpense(category, start, end, detail, preco, exp.id, exp.id_house)}
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