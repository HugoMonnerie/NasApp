import React from 'react';
import {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TRASH_IMG_URI} from "../../assets/images";

const FavListItem = ({item, title, index, navigation, deleteElement }) => {
    const goDetails = useCallback(() => {
            navigation.navigate("ImageDetails", {photoData: item, index: index})
        },[navigation],
    );

    return (
        <TouchableOpacity onPress={goDetails} style={styles.listItem}>
            <Text style={styles.itemText}>{title}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteElement.bind(this, index)}>
                <Image style={styles.buttonDeleteImg} source={{ uri: TRASH_IMG_URI}}/>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: '457383',
        //borderWidth: 1,
        //borderColor: '#FF5555',
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 25,
        color: '#000000',
    },
    deleteButton: {
        margin: 5,
    },
    buttonDeleteImg: {
        //borderRadius: 50,
        //backgroundColor: '#FF5555',
        height: 30,
        width: 30,
        //fontSize: 20,
        //color: '#F6F6F6',
    },
});

export default FavListItem;
