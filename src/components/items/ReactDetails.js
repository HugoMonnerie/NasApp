import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export const ReactDetails = ({onPress, isDisplayedDescription, content}) =>{
    return (
        <View style={styleHome.block}>
            <TouchableOpacity onPress={onPress}>
                <Text>Explanations</Text>
            </TouchableOpacity>
            <Text>{isDisplayedDescription ? content : ""}</Text>
        </View>
    )
}

const styleHome = StyleSheet.create({
    block:{
        marginTop:10
    },
})