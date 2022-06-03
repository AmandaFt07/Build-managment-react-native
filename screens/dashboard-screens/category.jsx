import {useState, useEffect } from 'react';

import { Text, ScrollView, View, Pressable, StyleSheet, RefreshControl } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 

export default function Category({navigation, route}){
    const {specificExpense} = route.params

    const [ totalMaterial, setTotalMaterial ] = useState(0)
    const [ totalElet, setTotalElet ] = useState(0)
    const [ totalPaint, setTotalPaint ] = useState(0)
    const [ totalPlum, setTotalPlum ] = useState(0)
    const [ totalCarp, setTotalCarp ] = useState(0)
    const [ totalTaxe, setTotalTaxe ] = useState(0)
    const [ totalOther, setTotalOther ] = useState(0)

    useEffect(()=>{
        getData()
    }, [])

    function getData(){
        let material = 0
        let elet = 0
        let paint = 0
        let plum = 0
        let carp = 0
        let taxe = 0
        let other = 0

        specificExpense.map((item) => {
            let valor = parseInt(item.total)
            
            if ( item.category == "materials" ){
                material = material + valor
            } else if ( item.category == "electrician" ){
                elet = elet + valor
            } else if ( item.category == "painter" ){
                paint = paint + valor
            } else if ( item.category == "plumber" ){
                plum = plum + valor
            } else if ( item.category == "carpenter" ){
                carp = carp + valor
            } else if ( item.category == "taxes" ){
                taxe = taxe + valor
            } else if ( item.category == "others" ){
                other = other + valor
            }
            
        })

        setTotalMaterial(material)
        setTotalElet(elet)
        setTotalPaint(paint)
        setTotalPlum(plum)
        setTotalCarp(carp)
        setTotalTaxe(taxe)
        setTotalOther(other)
    }

    return(
        <ScrollView>
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.title}>Cost per category</Text>
            </View>

            <View style={{display:"flex", flexDirection:"column", paddingHorizontal:20, paddingVertical:30}}>
                
                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Materials</Text>
                    <Text style={[styles.white, styles.field]}>{totalMaterial} €	</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Electrician</Text>
                    <Text style={[styles.white, styles.field]}>{totalElet} €</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Painter</Text>
                    <Text style={[styles.white, styles.field]}>{totalPaint} €</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Plumber</Text>
                    <Text style={[styles.white, styles.field]}>{totalPlum} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Carpenter</Text>
                    <Text style={[styles.white, styles.field]}>{totalCarp} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Taxes</Text>
                    <Text style={[styles.white, styles.field]}>{totalTaxe} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>Others</Text>
                    <Text style={[styles.white, styles.field]}>{totalOther} €</Text>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#9e639e",
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

    row:{
        display: 'flex',
        flexDirection: 'row',
    },

    purple:{
        backgroundColor:"#9e639e",
        color: "#fff",  
        fontWeight: "bold",  
        borderBottomColor: "#fff",
        borderBottomWidth: 1,    
    },

    field:{
        width: "50%",
        paddingVertical:20,
        textAlign: "center",
        fontSize: 20,
    },

    white:{
        color: "#9e639e",
        borderWidth: 1,
        borderColor: "#9e639e",
    }
})

