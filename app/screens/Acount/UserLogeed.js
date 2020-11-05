import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";
import * as firebase from "firebase";
import Toast from "react-native-easy-toast";

import Loading from "../../components/Loading";
import InfoUser from './InfoUser';
import AcountOption from   "../../components/Acount/AcountOptions";


export default function UserLogeed(){

    const toastRef = useRef();
    const [loading, setLoading] = useState(false);
    const [loadingtext, setLoadingtext] = useState("");
    const [userinfo, setUserinfo] = useState(null);
    const [reloaduserinfo, setReloaduserinfo] = useState(false);

    useEffect(() => {
       (async () => {
        const user = await firebase.auth().currentUser;
        setUserinfo(user);
       })()
       setReloaduserinfo(false);
    }, [reloaduserinfo])


    return(
        <View style={styles.viewuserinfo} >
            {userinfo && 
            <InfoUser 
                userinfo={userinfo} 
                toastRef={toastRef}  
                setLoading={setLoading} 
                setLoadingtext={setLoadingtext} 
            />}    

            
            <AcountOption userinfo={userinfo} toastRef={toastRef} setReloaduserinfo={setReloaduserinfo} /> 
            <Button 
            title="Cerrar Sesion"
            buttonStyle={styles.btnclosesesion}
            titleStyle={styles.titlestile}
            onPress={() => firebase.auth().signOut()} />

            <Toast ref={toastRef} position="center" opacity={0.9}/>

            <Loading text={loadingtext} isVisible={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewuserinfo:{
        minHeight:"100%",
        backgroundColor:"#f2f2f2"
    },
    btnclosesesion:{
        marginTop:30,
        borderRadius:0,
        backgroundColor:"#FFF",
        borderTopWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop:10,
        paddingBottom:10
    },
    titlestile:{
        color:"#00a680"
    }
});