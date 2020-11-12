import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import {Icon, Image, Input, Button, Avatar} from 'react-native-elements';
import { Alert } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {filter, map, size} from "lodash";
import * as Location from "expo-location";


import Modal from "../Modal";

const widthScreen = Dimensions.get("window").width;


export default function AddrestauranteForm(props){

    const {toastRef, setIsLoading, navigation }= props;
    const [restaurantadres, setRestaurantadres] = useState("");
    const [restaurantdescrip, setRestaurantdescrip] = useState(null);
    const [restaurantname, setRestaurantname] = useState("");
    const [imgselected, setImgselected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false)


    const addrestaurante = () => {

    }
    
    return(
        <ScrollView
        style={style.scroll}
        >
            <ImgRestaurante imagerestaurant={imgselected[0]} />

         <Formadd
         setRestaurantname={setRestaurantname}
         setRestaurantadres={setRestaurantadres}
         setRestaurantdescrip={setRestaurantdescrip} 
         setIsVisibleMap={setIsVisibleMap}
         />

        <Imgadd 
        toastRef={toastRef} 
        imgselected={imgselected} 
        setImgselected={setImgselected}
        />

         <Button 
         title="Crear Restaurante"
         onPress={addrestaurante}
         buttonStyle={style.btnstyle}
         />
         <Map 
         toastRef={toastRef}
         isVisibleMap={isVisibleMap}
         setIsVisibleMap={setIsVisibleMap}
         />
        </ScrollView>
    );
}

function ImgRestaurante(props){

    const {imagerestaurant} = props;

    return(
        <View style={style.viewfoto}>
            <Image source={imagerestaurant ? {uri:imagerestaurant} : require("../../../assets/img/no-image.png")}
            style={{width: widthScreen, height:200}}
            />
        </View>
    )

}

function Formadd(props){

    const {setRestaurantname, setRestaurantadres, setRestaurantdescrip, setIsVisibleMap} = props;

    return(
        <View style={style.view}>

            <Input 
            placeholder="Nombre del restaurante" 
            style={style.inputf}
            onChange={(e) => setRestaurantname(e.nativeEvent.text)}
            >                
            </Input>

            <Input placeholder="Direccion del restaurante"
                style={style.inputf}
            onChange={(e) => setRestaurantadres(e.nativeEvent.text)}
            rightIcon={{
                type:"material-community",
                name:"google-maps",
                color:"#c2c2c2",
                onPress: () => setIsVisibleMap(true),
            }}
            >                
            </Input>

            <Input 
            placeholder="Descripcion del restaurante" 
            multiline={true} style={style.inputf} 
            inputContainerStyle={style.inputconst}
            onChange={(e) => setRestaurantdescrip(e.nativeEvent.text)}
            >             
            </Input>
       
        </View>
    )
}

// Funcion para cargar mapa

function Map(props){
    const {isVisibleMap, setIsVisibleMap,toastRef} = props;

    useEffect(() => {
       (async ()=> {
        const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
        const statusPermissions = resultPermissions.permissions.location.status;
        if(statusPermissions !== "granted"){
            console.log(statusPermissions)
           toastRef.current.show("Tienes que aceptar los permisos de localización",3000);
        }else{
            const loc = await Location.getCurrentPositionAsync({});
            setloction({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })
        }
       })()
    }, [])

    return(
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
            <Text>Mapa</Text>
        </Modal>
    )

}

function Imgadd(props){

    const {toastRef,imgselected, setImgselected} = props;

    const imageselect = async () => {

       const reultpermission = await Permissions.askAsync(
           Permissions.CAMERA_ROLL
       );
       
       if(reultpermission === "denied"){
        toastRef.current.show("Es necesario aceptar los permisos de la galeria, ve a configuracion app y acepta para poder usar la galeria",1000);

       }else {
           const result = await ImagePicker.launchImageLibraryAsync({
               allowsEditing: true,
               aspect:[4,3]
           });

           if(result.cancelled){
               toastRef.current.show("Has cerrado la galeria sin elegir ninguna imagen",1000)
           }else{
               setImgselected([...imgselected, result.uri]);
           }
       }
    };

    const remobeimg = (image) => {
        
        Alert.alert(
            "Eliminar",
            "¿Desea eliminar la imagen?",
            [
                {
                    text: "Cancel",
                    style:"cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                       setImgselected(
                         filter(imgselected, (imageurl) => imageurl !== image)
                       );
                    },   
                }    
            ],
            {cancelable: false}
            )
    }

    return(
                        //codigo para scroll horizontal de fotos     
                        /*<ScrollView horizontal>
                              { Code... }
                            </ScrollView>*/

        <View style={style.viewimg}>
            {size(imgselected) < 4 &&(
                <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={style.conticon}
                onPress={imageselect}
                />
            )}
            {map(imgselected, (imagerestaurant, index) => (
            <Avatar
            key={index}
            style={style.minstl}
            source={{uri: imagerestaurant }}
            onPress={() => remobeimg(imagerestaurant)}
            />

            ))}
        </View>
    )
}

const style = StyleSheet.create({
    scroll:{
        height:"100%",
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
    },
    viewimg:{
        flexDirection:"row",
        marginLeft:20,
        marginRight:20,
        marginTop:30
    },
    conticon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        width:70,
        height:70,
        backgroundColor:"#e3e3e3"
        
    },
    minstl:{
        width:70,
        height:70,
        marginRight:10
    },
    viewfoto:{
        alignItems:"center",
        height:200,
        marginBottom:20
    }
})