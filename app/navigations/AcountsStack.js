import React from "react";
import { createStackNavigator} from "@react-navigation/stack";
import Acounts from "../screens/Acount/Acounts";
import Login from "../screens/Acount/Login"
import Register from "../screens/Acount/Register"

const Stack = createStackNavigator();

export default function AcountsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
             name="acounts"
             component={Acounts} 
             options={{title: "Mi cuenta"}}
            />

            <Stack.Screen
             name="login"
             component={Login}
             options={{title:"Iniciar sesion."}}
            />

            <Stack.Screen
             name="register"
             component={Register}
                options={{title:"Formulario de Registro."}}
            />

        </Stack.Navigator>
    )
}