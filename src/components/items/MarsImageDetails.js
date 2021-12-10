import React, {useCallback} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Image} from 'react-native';
import {dateFilterFrench} from "../../assets/js/commonFunction";
import {useDispatch, useSelector } from "react-redux";
import {addFavorite, removeFavorite} from "../../redux/actions";
import {FavoriteButton} from "./FavoriteButton";
import {GoBackButton} from "./GoBackButton";

export const MarsImageDetails = ({route, navigation}) =>{
    const {index, photoData} = route.params
    const dispatch = useDispatch()
    const favList =useSelector(state=>state.favReducer.favList)
    const user =useSelector(state=>state.userReducer.users)
    console.log(user)

    const isInFavList = useCallback(()=>{
        return favList.some(el=> el!== null && photoData.id === el.id)
    },[dispatch, favList])

    const goBack = useCallback(()=>{
        navigation.goBack()
    },[navigation])

    //region redux
    const addFav = photoData => dispatch(addFavorite(photoData));
    const delFav = index => dispatch(removeFavorite(index));

    const addToFavorite = useCallback(()=>{
        addFav(photoData)
    },[])

    const removeFromFavorite = useCallback(()=>{
        delFav(photoData.id)
    },[])
    //endregion

    return (
        <SafeAreaView style={styleMarsImageDetails.main}>
            <View>
                <Image style={styleMarsImageDetails.img} source={{uri: photoData.img_src.replace('http://', 'https://')}}/>
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
            </View>
            <View style={styleMarsImageDetails.buttonContainer}>
                <GoBackButton goBack={goBack}/>
                <FavoriteButton addToFavorite={addToFavorite}
                            isInFavList={isInFavList}
                            removeFromFavorite={removeFromFavorite}/>
            </View>
        </SafeAreaView>
    )
}

export const styleMarsImageDetails = StyleSheet.create({
    main:{
        height:"100%",
        justifyContent:"space-between"
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
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent: "space-between"
    }
})
