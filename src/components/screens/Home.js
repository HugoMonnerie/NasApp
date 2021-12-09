import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import apiNasa from "../../assets/js/api";
import {dateFilterFrench} from "../../assets/js/commonFunction";

export const Home = () =>{
    const [pictureData, setPictureData] = useState({})
    const [isDisplayedDescription, setIsDisplayedDescription] = useState(false)

    useEffect(()=>{
        const run = async () =>{
            const res = await apiNasa.apiNasaApod({})
            setPictureData(res)
        }
        run()
    }, [])

    const handleDisplayDescription = useCallback(()=>{
        setIsDisplayedDescription(!isDisplayedDescription)
    }, [isDisplayedDescription])

    return (
        <SafeAreaView>
            <Image style={styleHome.img} source={{uri:pictureData.hdurl}}/>
            <View style={styleHome.block}>
                <Text style={styleHome.title}>{pictureData.title}</Text>
                <Text style={styleHome.author}>{pictureData.copyright}</Text>
                <Text>{dateFilterFrench(pictureData.date)}</Text>
            </View>
            <View style={styleHome.block}>
                <TouchableOpacity onPress={handleDisplayDescription}>
                    <Text>Explanations</Text>
                </TouchableOpacity>
                <Text>{isDisplayedDescription ? pictureData.explanation : ""}</Text>
            </View>
        </SafeAreaView>
    )
}

const styleHome = StyleSheet.create({
    main:{
        backgroundColor:"#D7DEDEDE",
        width:"100%",
        flex:1,
        borderColor:"black",
        borderRightWidth:1,
        borderStyle:"solid"
    },
    img:{
        width:"100%",
        height:300
    },
    block:{
        marginTop:10
    },
    title:{
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    author:{
        fontWeight:"900"
    }
})