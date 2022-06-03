import React from 'react';
import { Text, ScrollView, View, Pressable, StyleSheet } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 


export default function Dashboard({navigation, route}){
    const {specificExpense} = route.params

    return(

        <ScrollView>
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.title}>Dashboard</Text>
            </View>

            <View style={{paddingVertical:40, paddingHorizontal:20}}>
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>

                    <Pressable onPress={()=>navigation.navigate("Month", {specificExpense})} style={[styles.btn, { backgroundColor: "#710096"}]}>
                        <Text style={[styles.title, {fontWeight: "bold"}]}>Month</Text>
                    </Pressable>

                    <Pressable onPress={()=>navigation.navigate("Category", {specificExpense})} style={[styles.btn, { backgroundColor: "#9e639e"}]}>
                        <Text style={[styles.title, {fontWeight: "bold"}]}>Category</Text>
                    </Pressable>

                    <Pressable style={[styles.btn, { backgroundColor: "#e5a995"}]}>
                        <Text style={[styles.title , {fontWeight: "bold"}]}>Average</Text>
                    </Pressable>

                </View>

          
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#439aa5",
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

    btn:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 150,
        marginBottom: 30
    }
})