import React from "react";
import {StyleSheet, View, Text} from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function InfoUser(props){

    const {
        userinfo: {uid, photoURL, email, displayName},
         toastRef, setLoading, setLoadingtext } = props;


    const changeavatar = async () =>{

        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;

        if(resultPermissionsCamera === "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de la galeria, ve a configuracion app y acepta para poder usar la galeria");
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });  

            if(result.cancelled){
                toastRef.current.show("Has cerrado la seleccion de tu imagen")
            }else{
                uploadimg(result.uri)
                .then(() => {
                    updatephotourl(); 
                }).catch(()=>{
                    toastRef.current.show("Error al subir la imagen");
                })
            }
        }
    }

    const uploadimg =  async (uri) =>{
        setLoadingtext("Actualizando avatar")
        setLoading(true);

        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob);
    }

    const updatephotourl = () =>{
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL()
        .then( async (result) => {
            const update = {
                photoURL: result,
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Error al actualizar")
        })
    };

    return(
        <View style={styles.viewstiles}>
            <Avatar 
            rounded
            size="large"
            showEditButton
            onEditPress={changeavatar}
            containerStyle={styles.userinfoavat}
            source={
                photoURL ? {uri: photoURL} : require("../../../assets/img/avatar-default.jpg")
            }
            />
            <View>
            <Text style={styles.txtstile}>{displayName ? displayName : "Anónimo"}</Text>
            <Text>{email ? email : "Logueado con red social" }</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    userinfoavat:{
        marginRight:20
    },
    viewstiles:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    },
    txtstile:{
        fontWeight:"bold",
        paddingBottom:5,
    },
}); 