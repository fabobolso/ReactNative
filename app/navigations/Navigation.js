import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from "react-native-elements"

import RestaurantsStack from "./RestaurantsStack"
import FavoritesStack from "./FavoritesStack"
import TopRestaurantesStack from "./TopRestaurantesStack";
import SearchStack from "./SearchStack";
import AcountsStack from "./AcountsStack";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName="acounts"
            tabBarOptions={{
                inactiveTintColor: "#646464",
                activeTintColor: "#00a680"
            }}
            screenOptions={({route}) =>({
                tabBarIcon: ({color}) => screenOptions(route, color)
            })}
            >
                <Tab.Screen name="restaurants" component={RestaurantsStack} options={{title: "Restaurantes"}}/>
                <Tab.Screen name="favorites" component={FavoritesStack} options={{title: "Favoritos"}}/>
                <Tab.Screen name="search" component={SearchStack} options={{title: "Buscar"}}/>
                <Tab.Screen name="acounts" component={AcountsStack} options={{title: "Cuentas"}}/>
                <Tab.Screen name="top-restaurants" component={TopRestaurantesStack} options={{title: "Top 5"}}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function screenOptions(route, color){
    let iconName;

    switch (route.name){

        case "restaurants":
            iconName = "compass-outline"
            break;
            case "favorites":
                iconName = "heart-outline"
                break;
                case "search":
                    iconName = "star-outline"
                    break;
                    case "acounts":
                        iconName = "star-outline"
                        break;
                        case "top-restaurants":
                            iconName = "star-outline"
                            break;
                            default:
                            break;
    }

    return(
        <Icon type="material-community" name={iconName} size={22} color={color}/>
    ); 


}