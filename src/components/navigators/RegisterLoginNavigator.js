import React from "react";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import {createStackNavigator} from "@react-navigation/stack";
import { AppTabNavigator } from "./AppTabNavigator";

const Stack = createStackNavigator();

export const RegisterLoginNavigator = ()=>{
    return (
        <Stack.Navigator initialRouteName="Register"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={LogIn} />
            <Stack.Screen name="AppTabNavigator" component={AppTabNavigator} />
        </Stack.Navigator>
    )
}