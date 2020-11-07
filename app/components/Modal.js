import React, {useState} from "react";
import { StyleSheet} from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props){
    const {isVisible, setVisible, children} = props;

    

    const closemodal = () => setVisible(false);


    

    return (
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor="#7A7979bf"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlay}
        onBackdropPress={closemodal}
        >
            {children}
        </Overlay>
    )
}


const styles = StyleSheet.create({
    overlay:{
        height: "auto",
        width:"90%",
        backgroundColor:"#fff"
    }
})