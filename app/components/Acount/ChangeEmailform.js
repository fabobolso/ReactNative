import React, {useState} from "react";
import { StyleSheet, View} from "react-native";
import {Input, Button} from "react-native-elements";


export default function ChangeEmail(props){

    const {email, setShowmodal, toastRef, setReloaduserinfo} = props;
    const [formData, setFormData] = useState(defaultValue())

    const onChange = (e, type) => {
    // ...para traer el valor anterior []para que la key pueda ser una variable dinamica : obtengo el valor del input
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = () => {
        console.log(formData);
    }

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
             />
             <Input
             placeholder="Contraseña"
             containerStyle={styles.input}
             password={true}
             secureTextEntry={true}
             rightIcon={{
                 type:"material-community",
                 name:"eye-outline",
                 color:"#c2c2c2"
             }}       
             onChange={(e) => onChange(e, "password")}      
             />
             <Button
                title="Cambiar correo"
                containerStyle={styles.btnc}
                buttonStyle={styles.btn}
                onPress={onSubmit}
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