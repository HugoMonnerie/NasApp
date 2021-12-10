import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import apiNasa from "../../assets/js/api";
import {dateFilterFrench} from "../../assets/js/commonFunction";
import {ReactDetails} from "../items/ReactDetails";
import {ScrollView} from "react-native-gesture-handler";

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
            <ScrollView>
                <Image style={styleHome.img} source={{uri:pictureData.hdurl}}/>
                <View style={styleHome.block}>
                    <Text style={styleHome.title}>{pictureData.title}</Text>
                    <Text style={styleHome.author}>{pictureData.copyright}</Text>
                    <Text>{dateFilterFrench(pictureData.date)}</Text>
                </View>
                <ReactDetails onPress={handleDisplayDescription} content={pictureData.explanation} isDisplayedDescription={isDisplayedDescription}/>
            </ScrollView>
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