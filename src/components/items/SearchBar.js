import {Image, StyleSheet, TextInput, View} from "react-native";
import React from "react";
import {SEARCH_IMG_URI} from "../../assets/images";

export const SearchBar = ({value, onChangeText}) =>{
    return (
        <View style={styles.searchBar}>
            <Image style={styles.searchImage} source={{uri: SEARCH_IMG_URI}}/>
            <TextInput
                placeholder={'Rechercher'}
                value={value}
                onChangeText={onChangeText}
                style={styles.searchInput}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flex:1,
        backgroundColor: '#E6E6E6',
        margin: 3,
        padding: 3,
        width: 380,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        height: 50,
        fontSize: 20,
    },
    searchImage:{
        height: 30,
        width: 30,
        marginHorizontal: 5,
    },
});