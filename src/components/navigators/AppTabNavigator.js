import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import {FORM_IMG_URI, FLEXBOX_IMG_URI, FORM_ENHANCED_IMG_URI, LIST_IMG_URI, TODO_LIST_IMG_URI} from "../../assets/images";
import {SearchMarsImageNavigator} from "./SearchMarsImageNavigator" ;
import {SearchEarthImage} from "../screens/SearchEarthImage";
import {Home} from "../screens/Home";
import {FavoritesNavigator} from "./FavoritesNavigator";
import { Button } from "react-native";
import auth from "@react-native-firebase/auth";

const Tab = createBottomTabNavigator();

export const AppTabNavigator = ({navigation})=>{

    const LogOut = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Register'));
    }
    const headerLogout = () =>{
        return {
            headerRight: () => (
                <Button
                    title="Sign out"
                    onPress={LogOut}
                />),
        }
    }
    return (
        <Tab.Navigator initialRouteName="Home"
               screenOptions={({ route }) => ({
                   tabBarIcon: ({ focused, color, size }) => {
                       let iconUri;

                       if (route.name === "SearchImagePages") {
                           iconUri = FORM_IMG_URI
                       } else if (route.name === "TodoList") {
                           iconUri = TODO_LIST_IMG_URI
                       }
                       else if(route.name === "EarthImage"){
                           iconUri = FLEXBOX_IMG_URI
                       }
                       else if(route.name === "Home"){
                           iconUri = FORM_ENHANCED_IMG_URI
                       }
                       else{
                           iconUri = LIST_IMG_URI
                       }
                       return <Image style={{width:20, height:20}} source={{uri:iconUri}} size={size} color={color} tintColor={color}/>;
                   },
                   tabBarActiveTintColor: "tomato",
                   tabBarInactiveTintColor: "gray",
               })}
        >
            <Tab.Screen options={headerLogout}
                        name="SearchImagePages" 
                        component={SearchMarsImageNavigator} />
            <Tab.Screen options={headerLogout}
                        name="EarthImage" 
                        component={SearchEarthImage} />
            <Tab.Screen options={headerLogout}
                        name="Home" 
                        component={Home} />      
            <Tab.Screen name="Favorites" component={FavoritesNavigator} />
        </Tab.Navigator>
    )
}