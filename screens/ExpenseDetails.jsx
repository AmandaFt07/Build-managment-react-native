import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator, Alert, RefreshControl } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'; 

import db from '../firebase.config'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

const ExpensesDetails = ({route, navigation}) => {
    //house id
    const {id} = route.params
    
    const [expenses, setExpenses] = useState([])
    const [specificExpense, setSpecificExpense] = useState([])
    
    const expensesCollection = collection(db, 'expenses')

    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=> {
        const getexpenses =  async() => {
            const data = await getDocs(expensesCollection)
            setExpenses(data.docs.map((doc) => ( {...doc.data(), id: doc.id } )))   
        }

        getexpenses() 

    }, [])

    useEffect(() => {
        setSpecificExpense([])
        expenses.map((item) => {
            if (id === item.id_house){
                setSpecificExpense( oldArray => [...oldArray, item])
            }
        })
    }, [expenses])

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

    const getexpenses =  async() => {
        const data = await getDocs(expensesCollection)
        setExpenses(data.docs.map((doc) => ( {...doc.data(), id: doc.id } )))   
    }
   
    const onRefresh = () => {
        setRefreshing(true);
        getexpenses() 
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
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.title}>Expenses details</Text>
            </View>

            <View style={{padding:20}}>

                <Pressable onPress={()=>navigation.navigate("Dashboard", {specificExpense})}>
                    <Text style={[styles.mydash, {fontWeight: "bold"}]}>My Dashboard</Text>
                </Pressable>

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

                                {
                                    exp.detail.length > 0 &&
                                    <View style={styles.infos}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Detail: </Text>
                                        <Text style={{fontSize: 18}} >{exp.detail}</Text>
                                    </View>
                                }
                                
                                {
                                    exp.start.length > 0 &&
                                    <View style={styles.infos}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Start: </Text>
                                        <Text style={{fontSize: 18}} key={index}>{exp.start}</Text>
                                    </View>
                                }

                                {
                                    exp.end.length > 0 &&
                                    <View style={styles.infos}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>End: </Text>
                                        <Text style={{fontSize: 18}} key={index}>{exp.end}</Text>
                                    </View>
                                }

                                {
                                    exp.total.length > 0 &&
                                    <View style={styles.infos}>
                                        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Total : </Text>
                                        <Text style={{fontSize: 18}} key={index}>{exp.total} &euro;</Text>
                                    </View>
                                }

                           
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

    mydash:{
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#439aa5",
        paddingVertical: 15,
        textAlign: "center",
        marginBottom: 30,
        backgroundColor:"#439aa5",
        color: "#fff",
        // color: "#439aa5",
        fontSize: 20,
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