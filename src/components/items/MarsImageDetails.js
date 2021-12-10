import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {dateFilterFrench} from "../../assets/js/commonFunction";
import {useDispatch, useSelector } from "react-redux";

export const MarsImageDetails = ({route, navigation}) =>{
    const {index, photoData} = route.params
    const dispatch = useDispatch()

    const isInFavList = useCallback(()=>{
        return useSelector(state=>state.favList.some(el=>photoData.id === el.id))
    },[dispatch])

    const goBack = useCallback(()=>{
        navigation.goBack()
    },[navigation])

    //region redux
    const addFav = useCallback((el)=>{
        dispatch({type:"ADD_FAV", value:el})
    }, [dispatch])

    const delFav = useCallback((index)=>{
        dispatch({type:"DEL_FAV", value:index})
    }, [dispatch])
    //endregion

    const addToFavorite = useCallback(()=>{
        addFav(photoData)
    },[])

    const removeFromFavorite = useCallback(()=>{
        delFav(photoData.id)
    },[])

    return (
        <SafeAreaView style={styleMarsImageDetails.main}>
            <ScrollView style={[styleMarsImageDetails.fullHeight]}>
                <Image style={styleMarsImageDetails.img} source={{uri: photoData.img_src}}/>
                <View>
                    <View style={styleMarsImageDetails.block}>
                        <Text>Photo date : {dateFilterFrench(photoData.earth_date)}</Text>
                        <Text>Photo id : {photoData.id}</Text>
                    </View>
                    <View style={styleMarsImageDetails.block}>
                        <Text>Camera : {photoData.camera.full_name} ({photoData.camera.name})</Text>
                    </View>
                    <View style={styleMarsImageDetails.block}>
                        <Text>Rover : {photoData.rover.name}</Text>
                        <Text>Launch date : {dateFilterFrench(photoData.rover.launch_date)}</Text>
                        <Text>Landing date : {dateFilterFrench(photoData.rover.landing_date)}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={goBack}>
                    <Text>return</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={isInFavList() ? removeFromFavorite : addToFavorite}>
                    <Text>{isInFavList() ? "Remove from" : "Add To"} favorites</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export const styleMarsImageDetails = StyleSheet.create({
    main:{
        height:"100%"
    },
    block:{
        marginTop:10
    },
    img:{
        width:"100%",
        minHeight:200,
        flex:1
    },
    fullHeight:{
        height:"100%"
    }
})
