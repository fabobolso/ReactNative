import React, {useState, useEffect} from 'react';
import {StyleSheet,View, Text} from 'react-native';
import {Icon} from "react-native-elements";
import {firebaseApp} from "../../utils/firebase";
import * as firebase from 'firebase';

export default function Restaurants(){

    const [user, setUser] = useState(null);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) =>{
            setUser(userInfo);
        })
    }, [])

    return(
        <View style={styles.view} >
            <Text>Restaurantes...</Text>
            {user &&  ( 
                 <Icon
                 type="material-community"
                 name="plus"
                 color="#00a680"
                 reverse
                 containerStyle={styles.btcon}
             >
                 
             </Icon>
            )}
           
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        backgroundColor:"#fff",
    },
    btcon:{
        position:"absolute",
        bottom:10,
        right:10,
        shadowColor: "black",
        shadowOffset:{width:2 , height:2},
        shadowOpacity:0.8 
    }
})