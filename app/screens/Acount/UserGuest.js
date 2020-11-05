import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import {Button} from "react-native-elements";
import { useNavigation } from "@react-navigation/native"


export default function UserGuest(){
    const navegar = useNavigation();
    return(
        <ScrollView centerContent="true">
            <Image 
             style={styles.image}
             source={require("../../../assets/img/user-guest.jpg")}
             resizeMode="contain"
            />
            <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
            <Text style={styles.description}> apiKey: "AIzaSyCRaqp933TlaS4LDyX-huyffWHA7i9CPEE",
    authDomain: "tenedores-4c1fe.firebaseapp.com",
    databaseURL: "https://tenedores-4c1fe.firebaseio.com",
    projectId: "tenedores-4c1fe",
    storageBucket: "tenedores-4c1fe.appspot.com",
    messagingSenderId: "304714452567",
    appId: "1:304714452567:web:5a9c936d70443abb781d12"</Text>
       <View style={styles.btnview}>
           <Button 
           buttonStyle={styles.btnstil}
           containerStyle={styles.btncont}
           title="Ver tu perfil"
           onPress={()=> navegar.navigate("login")}
           />
       </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    vieBody:{
        marginLeft: 30,
        marginRight:30,
    },
    image: {
        height: 300,
        width:"100%",
        marginBottom:40,
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom: 10,
        textAlign: "center",
    },
    description:{
        textAlign:"center",
        marginBottom:20,
    },
    btnview:{
        flex:1,
        alignItems:"center",
    },
    btnstil:{
        backgroundColor:"#00a680",
    },
    btncont:{
        width:"70%",
    }
});