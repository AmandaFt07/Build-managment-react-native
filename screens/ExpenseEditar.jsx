import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput , ScrollView, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import SelectDropdown from 'react-native-select-dropdown'

import db from '../firebase.config'
import { updateDoc, doc } from 'firebase/firestore'


const Expense = ({route, navigation}) => {
    const {exp} = route.params
    const categorytype = ["materials", "electrician", "painter", "plumber", "carpenter", "taxes", "others"]

    const [category, setCategory] = useState( exp.category )
    const [material, setMaterial] = useState( exp.title )
    const [descricao, setDescricao] = useState( exp.description )
    const [qntdd, setQuantidade] = useState( exp.unit )
    const [preco, setPreco] = useState( exp.price_unit )


    const editExpense = async(category, material, descricao, qntdd, preco, id, id_house) => {
        const expense = doc(db, 'expenses', id)

        await updateDoc(expense, {
            category: category,
            title: material,
            description: descricao,
            unit: qntdd,
            price_unit: preco,
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
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Material:</Text>
                        <TextInput 
                            value={material}
                            placeholder={exp.title}
                            onChangeText={setMaterial}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Descrição:</Text>
                        <TextInput 
                            value={descricao}
                            placeholder={exp.description}
                            onChangeText={setDescricao}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Quantidade:</Text>
                        <TextInput 
                            value={qntdd}
                            placeholder={exp.unit}
                            onChangeText={setQuantidade}
                            style={styles.input}
                        />
                    </View>  

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Preço unidade:</Text>
                        <TextInput 
                            value={preco}
                            placeholder={exp.price_unit}
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
                            onPress={() => editExpense(category, material, descricao, qntdd, preco, exp.id, exp.id_house)}
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