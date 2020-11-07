import React, {useState} from "react";
import { StyleSheet, View, Text} from "react-native";
import {Input, Button} from "react-native-elements";
import {size} from "lodash";
import {reautenticate} from "../../utils/api";
import * as firebase from "firebase";


export default function ChangePassword(props){

    const {setShowmodal, toastRef} = props;

    const [showpass, setShowpass] = useState(false);
    const [fordata, setFordata] = useState(updatedate());
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false)

    const onChange = (e, type) => {
        setFordata({...fordata, [type]: e.nativeEvent.text});
    };

    const onSubmit = async() =>{

        let isout = true;
        let errorTemp = {};
        setError({});
        if(!fordata.pass1 || !fordata.pass2 || !fordata.pass3){
            errorTemp = {
                pass1: !fordata.pass1 ? "Ingrese una contraseña correcta" : "",
                pass2: !fordata.pass2 ? "Ingrese una contraseña correcta" : "",
                pass3: !fordata.pass3  ? "Ingrese una contraseña correcta" : ""
            }
        }else if(fordata.pass2 !== fordata.pass3){
            errorTemp = {
                pass2:"Las contraseñas deben ser iguales",
                pass3:"Las contraseñas deben ser iguales"
            }
        }else if(size(fordata.pass3) < 6){
            errorTemp = {
                pass2:"Las contraseñas deben ser mayor a 5 caracteres",
                pass3:"Las contraseñas deben ser mayor a 5 caracteres"
            };
        }else{

            setLoading(true);

            await reautenticate(fordata.pass1)
            .then( async () =>{
               await firebase.auth().currentUser.updatePassword(fordata.pass2)
               .then(() => {
                    setLoading(false);
                    setShowmodal(false);
                    isout = false;
                    firebase.auth().signOut();

                })
                .catch(() => {
                    errorTemp = {
                        other:"Error al actualizar la contraseña",
                    };
                    setLoading(false)
                });
            })
            .catch(() => {
                setLoading(false);
                errorTemp = {
                    pass1:"La contraseña no es correcta",
                }
            })
        }
        isout && setError(errorTemp)
    }

    return(
        <View style={styles.view}>
           <Input placeholder="Contraseña actual"
           containerStyle={styles.Input} 
           password={true}
           secureTextEntry={showpass ? true : false}
           rightIcon={{
               type: "material-community",
               name: showpass ? "eye-off-outline" : "eye-outline",
               color:"#c2c2c2",
               onPress: () => setShowpass(!showpass)
           }}
           onChange={(e) => onChange(e, "pass1")}
           errorMessage={error.pass1}
           />
            <Input placeholder="Nueva contraseña"
           containerStyle={styles.Input} 
           password={true}
           secureTextEntry={showpass ? true : false}
           rightIcon={{
               type: "material-community",
               name: showpass ? "eye-off-outline" : "eye-outline",
               color:"#c2c2c2",
               onPress: () => setShowpass(!showpass)
           }}
           onChange={(e) => onChange(e, "pass2")}
           errorMessage={error.pass2}
           />
            <Input placeholder="Repetir nueva contraseña"
           containerStyle={styles.Input} 
           password={true}
           secureTextEntry={showpass ? true : false}
           rightIcon={{
               type: "material-community",
               name: showpass ? "eye-off-outline" : "eye-outline",
               color:"#c2c2c2",
               onPress: () => setShowpass(!showpass)
           }}
           onChange={(e) => onChange(e, "pass3")}
           errorMessage={error.pass3}
           />
           <Button title="Cambiar Contraseña"
           styles={styles.btn} 
           buttonStyle={styles.btns}
           onPress={onSubmit}
           loading={loading}
            />
            <Text>{error.other}</Text>
        </View>
    )
}

function updatedate(){
    return{
        pass1:"",
        pass2:"",
        pass3:""
    }
}

const styles = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingBottom:10,
        paddingTop:10
    },
    Input:{
        marginBottom:10
    },
    btn:{
        marginTop:20,
        width:"95%",
    },
    btns:{
         backgroundColor:"#00a680"
    }
});