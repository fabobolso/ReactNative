import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input, Icon, Button} from "react-native-elements";
import {isEmpty} from "lodash";
import { emailvalidate } from "../../utils/validations";
import  * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native";
import Loading from "../Loading";


export default function LoginForm(props){

    const navigation = useNavigation();
    const [loading, setloading] = useState(false)
    const {toastRef } = props;
    const [showPassword, setshowPassword] = useState(false);
    const [forData, setForData] = useState(defaultvalue());

    const onChange = (e, type)=>{
      setForData({...forData, [type]: e.nativeEvent.text});
    }

    const onSubmit = () => {
        if(isEmpty(forData.email) || isEmpty(forData.password)){
           toastRef.current.show("Todos los campos son obligatorios");
        }else if(!emailvalidate(forData.email)){
           toastRef.current.show("El correo no es correcto.")
        }else{
            setloading(true)
            firebase.auth().signInWithEmailAndPassword(forData.email, forData.password).then(()=> {
             setloading(false);
                navigation.navigate("acounts")
            }).catch(()=>{
                setloading(false);
               toastRef.current.show("Alguno de los datos no es correcto");
            })
        }
    }

    return(
        <View style={styles.formcontainer} >

            <Input placeholder="Correo electronico"
            containerStyle={styles.input}
            onChange={(e) => onChange(e, "email")}
            rightIcon={
                <Icon
                type="material-community"
                name="at"
                iconStyle={styles.iconemail}
                />
            } />

            <Input  placeholder="Contraseña"
            containerStyle={styles.input}
            onChange={(e) => onChange(e, "password")}
            password={true}
            secureTextEntry={showPassword ? false : true}
            rightIcon={
                <Icon
                type="material-community"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                iconStyle={styles.iconemail}
                onPress={() => setshowPassword(!showPassword)}
                />
            }
            />

            <Button title="Iniciar sesión"
            containerStyle={styles.btncontainer}
            buttonStyle={styles.btnlogin}
            onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Iniciando sesion"/>
        </View>
    )
}

function defaultvalue(){
    return{
        email:"",
        password:""
    }
}

const styles = StyleSheet.create({
    formcontainer:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        marginTop:30,
    },
    input:{
        width:"100%",
        marginTop:20,
    },
    btncontainer:{
        marginTop:20,
        width:"95%"
    },
    btnlogin:{
        backgroundColor:"#00a680"
    },
    iconemail:{
        color:"#c1c1c1"
    },
})