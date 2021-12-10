import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {HEARTH_IMG_URI} from "../../assets/images";
import React from "react";

export const FavoriteButton = ({isInFavList, removeFromFavorite, addToFavorite}) => {
    return (
        <TouchableOpacity style={styleFavoriteButton.main} onPress={isInFavList() ? removeFromFavorite : addToFavorite}>
            <Image source={{uri: HEARTH_IMG_URI}}
                   style={[styleFavoriteButton.favoriteImg, isInFavList() ? {} : styleFavoriteButton.notFavoriteImg]}/>
        </TouchableOpacity>
    )
}

export const styleFavoriteButton = StyleSheet.create({
    main:{
      alignItems:"flex-end",
        padding:5
    },
    img:{
        width:"100%",
        minHeight:200,
        flex:1
    },
    favoriteImg:{
        width:40,
        height:35,
        tintColor:"red"
    },
    notFavoriteImg:{
        tintColor:"grey"
    }
})
