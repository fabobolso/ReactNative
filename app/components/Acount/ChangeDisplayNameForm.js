import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button} from "react-native-elements";
import * as firebase from "firebase";


export default function ChangeDisplayNameForm(props){

    const {displayName, setShowmodal, toastRef, setReloaduserinfo} = props;

    const [newDisplayname, setNewDisplayname] = useState(null);
    const [error, setError] = useState(null);
    const [isloading, setIsloading] = useState(false);

    const onSubmit = () => {
        setError(null);
        if(!newDisplayname ){
            setError("El nombre no puede estar vacio")
        }else if(displayName === newDisplayname){
            setError("el nombre no debe ser igual al anterior")
        }else{ 
            setIsloading(true);
            const update = {
                displayName: newDisplayname
            }
            firebase.auth().currentUser.updateProfile(update)
            .then(() =>{
                setIsloading(false);
                setReloaduserinfo(true);
                setShowmodal(false);
            }).catch(() =>{
                setError("Error al actualizar.");
                setIsloading(false)
            })
        }
    }

    return (
        <View style={style.View}>
            <Input
                placeholder="Nombre y Apellidos"
                containerStyle={style.input}
                rightIcon={{
                    type:"material-community",
                    name:"account-circle-outline",
                    color:"#c2c2c2"
                }}
                defaultValue={displayName || ""}
                onChange={e => setNewDisplayname(e.nativeEvent.text)}
                errorMessage={error}
            />
            <Button 
                title="Cambiar nombre"
                containerStyle={style.btncont}
                buttonStyle={style.btn}
                onPress={onSubmit}
                loading={isloading}
                />
        </View>
    );
}

const style = StyleSheet.create({
    View:{
        alignItems:"center",
        paddingBottom:10,
        paddingTop:10
    },
    input:{
        marginBottom:10
    },
    btncont:{
        marginTop:20,
        width:"95%",
    },
    btn:{
        backgroundColor:"#00a680"
    }
})