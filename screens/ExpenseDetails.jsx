import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'; 

import db from '../firebase.config'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

const ExpensesDetails = ({route, navigation}) => {
    const {id} = route.params
    
    const [expenses, setExpenses] = useState([])
    const [specificExpense, setSpecificExpense] = useState([])
    
    const expensesCollection = collection(db, 'expenses')

    const [total, setTotal] = useState(0)
    

    useEffect(()=> {
        const getexpenses =  async() => {
            const data = await getDocs(expensesCollection)
            setExpenses(data.docs.map((doc) => ( {...doc.data(), id: doc.id } )))   
        }

        setSpecificExpense([])
        expenses.map((item) => {
            if (id === item.id_house){
                setSpecificExpense( oldArray => [...oldArray, item])
            }
        })

        getexpenses() 

    }, [expenses])

    function calc (specificExpense){

        // for (var i = 0; i<specificExpense.length; i++ ){
        //     setTotal(total + 1)

        // }
        
        
    }
  

    const deleteExpense = async(id) => {
        const expense = doc(db, 'expenses', id)
        await deleteDoc(expense)

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
            { text: "OK", onPress: () => deleteExpense(id) }
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
                <Text style={styles.title}>Expenses details</Text>
            </View>

            <View style={{padding:20}}>
                <Pressable onPress={()=>navigation.navigate("Expenses Add", {id:id})}>
                    <Text style={[styles.add_text, {fontWeight: "bold",}]}>Adicionar</Text>
                </Pressable>

                {specificExpense.length != 0 ?
                    specificExpense.map((exp, index) => {
                        return(
                            <View key={index}  style={styles.card}>

                                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                                    <Pressable  onPress={()=>navigation.navigate("Expenses Edit", {exp})}>
                                        <Text style={[styles.add_text, {fontWeight: 'bold', color:"#710096"}]}>Editar</Text>
                                    </Pressable>

                                    <Pressable onPress={() => createTwoButtonAlert(exp.id)}>
                                            <Feather name="trash-2" size={24} color="red" />
                                    </Pressable>

                                </View>
                    

                                <View style={styles.infos}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Category: </Text>
                                    <Text style={{fontSize: 18}} >{exp.category}</Text>
                                </View>

                                <View style={styles.infos}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Material: </Text>
                                    <Text style={{fontSize: 18}} >{exp.title}</Text>
                                </View>

                                <View style={styles.infos}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Descrição: </Text>
                                    <Text style={{fontSize: 18}} key={index}>{exp.description}</Text>
                                </View>

                                <View style={styles.infos}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Quantidade: </Text>
                                    <Text style={{fontSize: 18}} key={index}>{exp.unit}</Text>
                                </View>

                                <View style={styles.infos}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Preço unidade: </Text>
                                    <Text style={{fontSize: 18}} key={index}>{exp.price_unit} &euro;	</Text>
                                </View>

                                <View style={styles.infos}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Total: </Text>
                                    <Text style={{fontSize: 18}} key={index}> {exp.unit * exp.price_unit }&euro;	</Text>
                                </View>
                            </View>
                        )
                    })

                :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#710096"/>
                    </View>
            }                
                
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

    card:{
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 20,
        borderColor: "#a7adaf",
        borderWidth: 1,
    },

    infos:{
        display: 'flex',
        flexDirection: 'row',
    },

    add_text:{
        fontSize: 18,
        textAlign: 'right',
        marginRight: 10,
    },  
})

export default ExpensesDetails