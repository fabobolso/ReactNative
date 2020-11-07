import React, {useState} from "react";
import { StyleSheet, View} from "react-native";
import {Input, Button} from "react-native-elements";
import {reautenticate } from "../../utils/api"
import { emailvalidate } from "../../utils/validations";
import * as firebase from "firebase";


export default function ChangeEmail(props){

    const {email, setShowmodal, toastRef, setReloaduserinfo} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [showpassword, setShowpassword] = useState(false);
    const [error, setError] = useState({});
    const [isloading, setIsloading] = useState(false)

    const onChange = (e, type) => {
    // ...para traer el valor anterior []para que la key pueda ser una variable dinamica : obtengo el valor del input
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = () => {
        setError({});
        if(!formData.email || email === formData.email){
            setError({email:"El email no ha cambiado"});
        }else if(!emailvalidate(formData.email)) {
            setError({email:"Correo incorrecto"});
        } else if(!formData.password){
            setError({password:"Debe ingresar su contraseña"})
        }else{
            setIsloading(true);
            reautenticate(formData.password).then(resp => {
                firebase.auth().currentUser.updateEmail(formData.email)
                .then(() => {
                    setIsloading(false);
                    setReloaduserinfo(true);
                    toastRef.current.show("Correo actualizado correctamente");
                    setShowmodal(false);
                }).catch(() =>{
                    setError({email:"Error al actualizar el correo"});
                    setIsloading(false);
                })
            }).catch(() => {
                setIsloading(false);
                setError({password: "La contraseña es incorrecta"});
            })
        }

    };

    return(
        <View style={styles.view}>
            <Input
             placeholder="Correo electrónico"
             containerStyle={styles.input}
             defaultValue={email || ""}
             rightIcon={{
                 type:"material-community",
                 name:"at",
                 color:"#c2c2c2"
             }}
             onChange={(e) => onChange(e, "email")}
             errorMessage={error.email}
             />
             <Input
             placeholder="Contraseña"
             containerStyle={styles.input}
             password={true}
             secureTextEntry={showpassword ? false : true}
             rightIcon={{
                 type:"material-community",
                 name: showpassword ? "eye-off-outline" : "eye-outline",
                 color:"#c2c2c2",
                 onPress: () => setShowpassword(!showpassword)
             }}       
             onChange={(e) => onChange(e, "password")}    
             errorMessage={error.password}  
             />
             <Button
                title="Cambiar correo"
                containerStyle={styles.btnc}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isloading}
             />
        </View>
    );
}

function defaultValue(){

    return{
        email:"",
        password:""
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10
    },
    btnc:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
})