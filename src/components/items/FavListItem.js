import React from 'react';
import {useState, useEffect, useMemo, useCallback} from 'react';
import {
    FlatList,
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
            <TouchableOpacity onPress={deleteElement.bind(this, props.index)}>
                <Text style={styles.button}>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    listItem: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '457383',
    },
    itemText: {
        fontSize: 20,
        color: '#000000',
    },
    button: {
        backgroundColor: '#FF5555',
        height: 45,
        fontSize: 20,
        color: '#F6F6F6',
    },
});

export default FavListItem;
