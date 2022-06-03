import { useState } from 'react'
import { Text, View, StyleSheet , TextInput, Pressable, Alert } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 

import db from '../firebase.config'

import { collection, updateDoc, doc } from 'firebase/firestore'

export default function EditProfile({navigation, route}){
    const {name, email, bio, id} = route.params

    const [ nome, setNome] = useState(name)
    // const [ newEmail, setNewEmail ] = useState(email)
    const [ newBio, setNewBio ] = useState(bio)

    

    const editProfile = async(nome, newEmail, newBio, id) => {
        const user = doc(db, 'users', email)

        await updateDoc(user, {
            name: nome,
            bio: newBio,
            // email: newEmail,
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
        <>
            <View style={styles.header}>

                <Pressable onPress={()=>navigation.goBack()} style={{marginRight:40}}>
                    <AntDesign name="arrowleft" size={24} color="#fff" />
                </Pressable>

                <Text style={styles.title}>Edit Profile</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.card}>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Name: </Text>
                        <TextInput 
                            value={nome}
                            placeholder={name}
                            onChangeText={setNome}
                            style={styles.input}
                        />
                    </View>

                    {/* <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Email:</Text>
                        <TextInput 
                            value={newEmail}
                            placeholder= {email}
                            onChangeText={setNewEmail}
                            style={styles.input}
                        />
                    </View> */}

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Bio: </Text>
                        <TextInput 
                            value={newBio}
                            placeholder= {bio}
                            onChangeText={setNewBio}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.buttons}>
                        <Pressable
                            style={styles.btn}
                            onPress={() => editProfile (nome, newBio, id)}
                        >
                            <Text style={styles.btn_text}>Update</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </>
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
        justifyContent: 'center',
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
    },

    imgbox:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
    }, 

    img:{
        width: 130,
        height: 130,
        borderRadius:100,
        marginBottom: 20,
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
        marginVertical: 20,
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

