import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import { dateFilterFrench} from "../../assets/js/commonFunction";
import {BG_IMG_MARS_URI} from '../../assets/images';

export const MarsImageItem = ({name, earthDate, id, imgSrc, goto,  index, roverName}) => {
    return (
        <View style={[styleMarsImageItem.fullWidth, styleMarsImageItem.main]} index={index} >
            <TouchableOpacity style={[styleMarsImageItem.fullWidth, styleMarsImageItem.fullHeight, styleMarsImageItem.flexBetween]} onPress={goto.bind(this, index)}>
                <View style={styleMarsImageItem.description}>
                    <Text>camera : {name}</Text>
                    <Text>id : {id}</Text>
                    <Text>date : {dateFilterFrench(earthDate)}</Text>
                    <Text>rover : {roverName}</Text>
                </View>
                <Image style={styleMarsImageItem.img} source={{uri:imgSrc}}/>
            </TouchableOpacity>
        </View>
    )
}

export const styleMarsImageItem = StyleSheet.create({
    main:{
        width: 400,
        height:100,
        backgroundColor:"#E9EEEEEE"
    },
    description:{
        flex:1,
        marginLeft:5
    },
    img:{
        minWidth:100,
        width: 300,
        height:"100%",
        flex:1
    },
    flexBetween:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    fullWidth:{
        width:"100%",
        borderWidth: 1,
    },
    fullHeight:{
        height:"100%"
    }
})
