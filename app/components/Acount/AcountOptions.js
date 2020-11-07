import React, {useState} from "react";
import { StyleSheet, View } from "react-native";
import {ListItem} from "react-native-elements";
import  {map} from "lodash";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmail from './ChangeEmailform'
import ChangePassword from "./ChangePassword";

import Modal from "../../components/Modal";
 
export default function AcountOption(props){

    const { userinfo, toastRef, setReloaduserinfo } = props;

    const [showmodal, setShowmodal] = useState(false);

    const [rendercomponent, setRendercomponent] = useState(null)
    
    
    const selectComponent = (key) => {
        switch(key){
            case "displayName":
                setRendercomponent(
                    <ChangeDisplayNameForm
                    displayName={userinfo.displayName}
                    setShowmodal={setShowmodal}
                    toastRef={toastRef}
                    setReloaduserinfo={setReloaduserinfo}
                    />
                );
                 setShowmodal(true);
            break;

            case "email":
                setRendercomponent(
                    <ChangeEmail 
                    email={userinfo.email}
                    setShowmodal={setShowmodal}
                    toastRef={toastRef}
                    setReloaduserinfo={setReloaduserinfo}
                    />
                    );
                    setShowmodal(true);
            break;

            case "password":
                setRendercomponent(
                    <ChangePassword
                    setShowmodal={setShowmodal}
                    toastRef={toastRef}
                    />
                    );
                    setShowmodal(true);
            break;

             default:
                 setRendercomponent(null);
                 setShowmodal(false)
                 break;
        }
    }
    const menuoption = generateoptions(selectComponent);
    
    return(
        <View>
            {map(menuoption, (menu, index) => (
                <ListItem  
                key={index}
                title={menu.title}
                leftIcon={{
                    type: menu.iconType,
                    name: menu.iconNameLeft,
                    color: menu.iconColorLeft, 
                }}
                rightIcon={{
                    type:menu.iconType,
                    name: menu.iconNameRigth,
                    color:menu.iconcolorRigth,
                }}
                containerStyle={styles.menuItem}
                onPress={menu.onPress}
                />
            ))}   
            {rendercomponent && 
            
            <Modal isVisible={showmodal} setVisible ={setShowmodal} >   
            {rendercomponent}
            </Modal>
            }  
        </View>
    )
}

function generateoptions(selectComponent){
    return [
        {
            title:"Cambiar Nombres y Apellidos",
            iconType:"material-community",
            iconNameLeft:"account-circle",
            iconColorLeft: "#ccc",
            iconNameRigth:"chevron-right",
            iconcolorRigth:"#ccc",
            onPress: ()=> selectComponent("displayName"),
            
        },
        {
            title:"Cambiar Email",
            iconType:"material-community",
            iconNameLeft:"at",
            iconColorLeft: "#ccc",
            iconNameRigth:"chevron-right",
            iconcolorRigth:"#ccc",
            onPress: ()=> selectComponent("email"),
        },
        {
            title:"Cambiar contraseña",
            iconType:"material-community",
            iconNameLeft:"lock-reset",
            iconColorLeft: "#ccc",
            iconNameRigth:"chevron-right",
            iconcolorRigth:"#ccc",
            onPress: ()=> selectComponent("password"),

        }
]
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomColor:"#e3e3e3",
        borderBottomWidth:1
    },
})