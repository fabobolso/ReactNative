import React from "react";
import { createStackNavigator} from "@react-navigation/stack";
import Acounts from "../screens/Acounts";

const Stack = createStackNavigator();

export default function AcountsStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="acounts" component={Acounts} options={{title: "Acounts"}}/>
        </Stack.Navigator>
    )
}