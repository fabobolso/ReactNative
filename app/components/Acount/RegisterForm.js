import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Input, Button, Icon} from "react-native-elements";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";


//Mis componentes
import {emailvalidate} from "../../utils/validations";
import Loading from "../Loading";

// npm loadsh para controles
import { size, isEmpty } from "lodash"

export default function RegisterForm(props){
    const { toastRef } = props;
    const [showPassword, setPassword] = useState(false);
    const [RepShowPassword, setRepShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultForm());
    const [loading, setloading] = useState(false)
    const navigation = useNavigation();

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)  || isEmpty(formData.repassword) )
        {
                toastRef.current.show("Todos los campos son obligatorios");
        }else if(!emailvalidate(formData.email)){
             toastRef.current.show("Email no valido"); 
        } else if(formData.password !== formData.repassword){
                toastRef.current.show("Las contraseñas deben ser iguales");
        } else if(size(formData.password) < 6 ){
            toastRef.current.show("Las contraseñas deben tener al menos 6 caracteres");
        }
        else{
            setloading(true);
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() =>{
                setloading(false);
               navigation.navigate("acounts")
            })
            .catch(() =>{
                setloading(false);
               toastRef.current.show("El mail ingresado ya exsiste")
            });
        }
    }

    const onchange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }


    return(
        <View style={estilos.formcont}>
            <Input
            placeholder="Correo"
            containerStyle={estilos.inputform}
            onChange={(e) => onchange(e, "email")}
            rightIcon={
                <Icon
                type="material-community"
                name="at"
                iconStyle={estilos.iconemail}
                />
            }
            />
             <Input
            placeholder="Contraseña"
            password={true}
            secureTextEntry={showPassword ? false : true}
            containerStyle={estilos.inputform}
            onChange={(e) => onchange(e, "password")}
            rightIcon={
                <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={estilos.iconemail}
                onPress={() => setPassword(!showPassword)}
                />
            }
            />
            <Input
            placeholder="Repetir Contraseña"
            password={true}
            secureTextEntry={RepShowPassword ? false : true}
            containerStyle={estilos.inputform}
            onChange={(e) => onchange(e, "repassword")}
            rightIcon={
                <Icon
                type="material-community"
                name="eye-outline"
                iconStyle={estilos.iconemail}
                onPress={() => setRepShowPassword(!RepShowPassword)}
                />
            }
            />
            <Button 
            title="Unirse"
            containerStyle={estilos.btnunirse}
            buttonStyle={estilos.btnjoin}
            onPress={onSubmit}
            />
            <Loading isVisible={loading} text={"Creando cuenta"} />
        </View>
    )
}

function defaultForm(){
    return{
        email:"",
        password: "",
        repassword:""
    }
} 

const estilos = StyleSheet.create({
    formcont:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        marginTop:30
    },
    inputform:{
        width:"100%",
        marginTop:20
    },
    btnunirse:{
        marginTop:20,
        width:"95%"
    },
    btnjoin:{
        backgroundColor: "#00a680"
    },
    iconemail:{
        color:"#c1c1c1"
    }
})