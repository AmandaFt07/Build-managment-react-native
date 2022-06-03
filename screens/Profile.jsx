import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput , ScrollView, Image} from 'react-native'
import UserContext from "../UserContext";


const Profile = ({navigation}) => {
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const { name, email, bio , id} = loggedUser;


    return(
        <ScrollView style={{flex: 1, backgroundColor: "#ebebeb" }}>
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.content}>

                <View style={styles.card}>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Name: {name}</Text>
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Email: {email}</Text>
                    </View>

                    <View style={styles.details}>
                        <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Bio: {bio}</Text>
                    </View>

                    <View style={styles.buttons}>
                        <Pressable
                            style={styles.btn}
                            onPress={()=> navigation.navigate("Edit Profile", {name, email, bio, id})}
                        >
                            <Text style={styles.btn_text}>Update</Text>
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

export default Profile