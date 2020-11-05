import React, {useRef} from "react";
import { View, StyleSheet, Image } from "react-native";

// keyboard para subir scrool automatico y no tapar input con teclado
import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import Toast from "react-native-easy-toast";

import RegisterForm from "../../components/Acount/RegisterForm"

export default function Register(){    
    const toastRef = useRef();
    return(
        <KeyboardAwareScrollView>
          <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          resizeMode="contain"
          style={estilos.imgS}
          />
          <View style={estilos.regisdter}>
              <RegisterForm toastRef={toastRef}/>
          </View>
          <Toast ref={toastRef} position="center"  opacity={0,9}/>
        </KeyboardAwareScrollView>
    );  
}


const estilos = StyleSheet.create({
    imgS:{
        width:"100%",
        height: 150,
        marginTop:20,
    },
    regisdter:{
        marginLeft: 40,
        marginRight: 40
    }
});