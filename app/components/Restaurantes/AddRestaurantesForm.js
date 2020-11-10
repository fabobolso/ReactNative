import React from "react";
import {StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import {Icon, Image, Input, Button} from 'react-native-elements';
import { Alert } from "react-native";


export default function AddrestauranteForm(){

    const addrestaurante = () => {

    }
    
    return(
        <ScrollView
        style={style.scroll}
        >

         <Formadd />
         <Button 
         title="Crear Restaurante"
         onPress={addrestaurante}
         buttonStyle={style.btnstyle}
         />
        </ScrollView>
    )
}

function Formadd(){
    return(
        <View style={style.view}>
            <Input placeholder="Nombre del restaurante" style={style.inputf}></Input>
            <Input placeholder="Direccion del restaurante" style={style.inputf}></Input>
            <Input placeholder="Descripcion del restaurante" multiline={true} style={style.inputf} inputContainerStyle={style.inputconst} ></Input>
       
        </View>
    )
}

const style = StyleSheet.create({
    scroll:{
        height:"100%"
    },
    view:{
        marginLeft:10,
        marginRight:10
    },
    inputf:{
      marginBottom:10  
    },
    inputconst:{
        height:100,
        width:"100%",
        padding:0,
        margin:0

    },
    btnstyle:{
        backgroundColor:"#00a680",
        marginTop:20,
        marginRight:5
    }
})