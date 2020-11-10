import React, {useRef, useEffect, useState} from "react";
import {View, Text} from "react-native";
import Toast from "react-native-easy-toast";
import Loadin from "../../components/Loading";
import AddrestauranteForm from "../../components/Restaurantes/AddRestaurantesForm";



export default function AddRestaurants(props) {

    const {navigation} = props;
    const toastRef = useRef()
    const [isLoading, setIsLoading] = useState(false);

    return(
        <View>
            <AddrestauranteForm
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loadin isVisible={isLoading} text="Creando restaurante" />
        </View>
    )
}
