import React, {useRef} from "react";
import {StyleSheet,ScrollView, View, Text, Image } from "react-native";
import {Divider} from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import LoginForm from "../../components/Acount/LoginForm";
import LoginFacebook from "../../components/Acount/LoginFacebook";


export default function Login(){

    const toastRef = useRef();

    return (
        <ScrollView>
        <Image
         source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
         resizeMode="contain"
         style={estilo.logo}
        />
        <View style={estilo.vista}>
            <LoginForm toastRef={toastRef} />
            <CreateAcount/>
        </View>
        <Divider style={estilo.divider}></Divider>
        <View style={estilo.vista}> 
        <LoginFacebook toastRef={toastRef} />
        </View>
        <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    );
}

function CreateAcount(){
    const navigation = useNavigation();
    return(
        <Text
        style={estilo.newcuent}
        >¿Aún no tienes cuenta?{" "}
        <Text
        style={estilo.btnR}
        onPress={() => navigation.navigate("register")}
        >Registrarse</Text>
        </Text>
    )
}


const estilo = StyleSheet.create({
    logo:{
        width:"100%",
        height:150,
        marginTop:20,
    },
    vista:{
        marginRight: 40,
        marginLeft: 40,
    },
    newcuent:{
        marginTop: 15,
        marginLeft: 10,
        marginRight:10,
    },
    btnR:{
        color: "#00a680",
        fontWeight:"bold",
    },
    divider:{
        margin: 40,
        backgroundColor: "#00a680", 
    }
});