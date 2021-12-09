import React from 'react';
import {useState, useEffect, useMemo, useCallback} from 'react';
import {
    FlatList, Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const FavListItem = props => {

    const favTitle = props.item.title

    //const {navigation} = props;

    const deleteElement = useCallback( index => {
        let newList = [...props.favList];
        newList.splice(index, 1);
        props.setFavList(newList);
        props.saveFavList(newList);
    }, [props.favList]);

    /*const goDetails = useCallback(
        infos => {
            navigation.navigate('TodoDetails', {infos: infos});
        },
        [navigation],
    );*/

    return (
        <TouchableOpacity
            style={styles.listItem}>
            <Text style={styles.itemText}>{favTitle}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={deleteElement.bind(this, props.index)}>
                <Image style={styles.buttonDeleteImg} source={{ uri: "https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Clipart.png"}}/>
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
