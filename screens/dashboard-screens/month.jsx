import { useState, useEffect } from 'react';

import { Text, ScrollView, View, Pressable, StyleSheet, RefreshControl } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 


export default function Month({navigation, route}){
    const {specificExpense} = route.params

    const [refreshing, setRefreshing] = useState(false);

    const [jan, setJan] = useState(0)
    const [feb, setFeb] = useState(0)
    const [mar, setMar] = useState(0)
    const [apr, setApr] = useState(0)
    const [may, setMay] = useState(0)
    const [jun, setJun] = useState(0)
    const [jul, setJul] = useState(0)
    const [aug, setAug] = useState(0)
    const [sep, setSep] = useState(0)
    const [oct, setOct] = useState(0)
    const [nov, setNov] = useState(0)
    const [dec, setDec] = useState(0)

    const [Averagejan, setAverageJan] = useState(0)
    const [Averagefeb, setAverageFeb] = useState(0)
    const [Averagemar, setAverageMar] = useState(0)
    const [Averageapr, setAverageApr] = useState(0)
    const [Averagemay, setAverageMay] = useState(0)
    const [Averagejun, setAverageJun] = useState(0)
    const [Averagejul, setAverageJul] = useState(0)
    const [Averageaug, setAverageAug] = useState(0)
    const [Averagesep, setAverageSep] = useState(0)
    const [Averageoct, setAverageOct] = useState(0)
    const [Averagenov, setAverageNov] = useState(0)
    const [Averagedec, setAverageDec] = useState(0)

    useEffect(() => {
        
       getData()
    }, [])

    function getData(){
        let janeiro = 0
        let fevereiro = 0
        let marco = 0
        let abril = 0
        let maio = 0
        let junho = 0
        let julho = 0
        let agosto = 0
        let setembro = 0
        let outubro = 0
        let novembro = 0
        let dezembro = 0

        let countjaneiro = 0
        let countfevereiro = 0
        let countmarco = 0
        let countabril = 0
        let countmaio = 0
        let countjunho = 0
        let countjulho = 0
        let countagosto = 0
        let countsetembro = 0
        let countoutubro = 0
        let countnovembro = 0
        let countdezembro = 0

        function getDataHere (){
            let monthlet 
    
            specificExpense.map((item)=>{
                
                if(item.start){
                    monthlet = item. start.substr(3,2)
    
                    let valor = parseInt(item.total)
    
                    if (monthlet == 1){    

                        janeiro = janeiro + valor
                        countjaneiro++ 

                    }else if(monthlet == 2){ 

                        fevereiro = fevereiro + valor
                        countfevereiro++ 

                    }else if(monthlet == 3){ 

                        marco = marco + valor
                        countmarco++ 

                    }else if(monthlet == 4){ 

                        abril = abril + valor
                        countabril++

                    }else if(monthlet == 5){ 

                        maio = maio + valor
                        countmaio++

                    }else if(monthlet == 6){ 

                        junho = junho + valor
                        countjunho++

                    }else if(monthlet == 7){ 

                        julho = julho + valor
                        countjulho++

                    }else if(monthlet == 8){ 

                        agosto = agosto + valor
                        countagosto++

                    }else if(monthlet == 9){ 

                        setembro = setembro + valor
                        countsetembro++

                    }else if(monthlet == 10){ 

                        outubro = outubro + valor
                        countoutubro++

                    }else if(monthlet == 11){ 
                        
                        novembro = novembro + valor
                        countnovembro++

                    }else if(monthlet == 12){ 

                        dezembro = dezembro + valor
                        countdezembro++
                    }
      
                   
                }        
            })
            
            return true
        }

        getDataHere()

        setJan(janeiro)
        setFeb(fevereiro)
        setMar(marco)
        setApr(abril)
        setMay(maio)
        setJun(junho)
        setJul(julho)
        setAug(agosto)
        setSep(setembro)
        setOct(outubro)
        setNov(novembro)
        setDec(dezembro)
        
        {janeiro == 0? setAverageJan(janeiro) : setAverageJan(janeiro/countjaneiro) }
        {fevereiro == 0? setAverageFeb(fevereiro) : setAverageFeb(fevereiro/countfevereiro)}
        {marco == 0? setAverageMar(marco) : setAverageMar(marco/ countmarco)}
        {abril == 0? setAverageApr(abril) : setAverageApr(abril/ countabril)}
        {maio == 0? setAverageMar(maio) : setAverageMar(maio/ countmaio)}
        {junho == 0? setAverageJun(junho) : setAverageJun(junho/ countjunho)}
        {julho == 0? setAverageJul(julho) : setAverageJul(julho/ countjulho)}
        {agosto == 0? setAverageMar(agosto) : setAverageMar(agosto/ countagosto)}
        {setembro == 0? setAverageMar(setembro) : setAverageMar(setembro/ countsetembro)}
        {outubro == 0? setAverageMar(outubro) : setAverageMar(outubro/ countoutubro)}
        {nov == 0? setAverageMar(novembro) : setAverageMar(novembro/ countnov)}
        {dezembro == 0? setDec(dezembro) : setDec(dezembro/ countdezembro)}
        
    }

    const onRefresh = () => {
        setRefreshing(true);
        getData() 
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
                <Text style={styles.title}>Cost per month</Text>
            </View>

            <View style={{display:"flex", flexDirection:"column", paddingHorizontal:20, paddingVertical:30}}>
                
                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>January</Text>
                    <Text style={[styles.white, styles.field]}>{jan} €	</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>February</Text>
                    <Text style={[styles.white, styles.field]}>{feb} €</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>March</Text>
                    <Text style={[styles.white, styles.field]}>{mar} €</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>April</Text>
                    <Text style={[styles.white, styles.field]}>{apr} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>May</Text>
                    <Text style={[styles.white, styles.field]}>{may} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>June</Text>
                    <Text style={[styles.white, styles.field]}>{jun} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>July</Text>
                    <Text style={[styles.white, styles.field]}>{jul} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>August</Text>
                    <Text style={[styles.white, styles.field]}>{aug} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>September</Text>
                    <Text style={[styles.white, styles.field]}>{sep} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>October</Text>
                    <Text style={[styles.white, styles.field]}>{oct} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>November</Text>
                    <Text style={[styles.white, styles.field]}>{nov} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>December</Text>
                    <Text style={[styles.white, styles.field]}>{dec} €</Text>
                </View>
            </View>

            <View style={{display:"flex", flexDirection:"column", paddingHorizontal:20, paddingVertical:30}}>
                <Text>Média</Text>
                
                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>January</Text>
                    <Text style={[styles.white, styles.field]}>{Averagejan} €	</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>February</Text>
                    <Text style={[styles.white, styles.field]}>{Averagefeb} €</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>March</Text>
                    <Text style={[styles.white, styles.field]}>{Averagemar} €</Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>April</Text>
                    <Text style={[styles.white, styles.field]}>{Averageapr} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>May</Text>
                    <Text style={[styles.white, styles.field]}>{Averagemay} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>June</Text>
                    <Text style={[styles.white, styles.field]}>{Averagejun} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>July</Text>
                    <Text style={[styles.white, styles.field]}>{Averagejul} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>August</Text>
                    <Text style={[styles.white, styles.field]}>{Averageaug} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>September</Text>
                    <Text style={[styles.white, styles.field]}>{Averagesep} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>October</Text>
                    <Text style={[styles.white, styles.field]}>{Averageoct} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>November</Text>
                    <Text style={[styles.white, styles.field]}>{Averagenov} €</Text>
                </View>

                <View  style={styles.row}>
                    <Text style={[styles.purple, styles.field]}>December</Text>
                    <Text style={[styles.white, styles.field]}>{Averagedec} €</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#710096",
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
        backgroundColor:"#710096",
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
        color: "#710096",
        borderWidth: 1,
        borderColor: "#710096",
    }
})
