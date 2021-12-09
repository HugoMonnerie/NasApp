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
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {useDispatch, useSelector} from 'react-redux';
import FavListItem from '../items/FavListItem';

const FavListScreen = props => {
    const [searchText, setSearchText] = useState('');
    const [favList, setFavList] = useState( [{title: "Img1"}, {title: "Img2"}, {title: "img3"}]);

    console.log('rrrr',favList);
    /*
    [
        {
            title: '',
            roverName: '',
            earth_date: '',
            url: '',
        }
    ]
     */

    const saveFavList = async value => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@favList', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    //saveFavList([{title: "Img1"}, {title: "Img2"}, {title: "img3"}]);

    const getFavList = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@favList');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            return [];
        }
    };

    const {navigation} = props;

    useEffect(() => {
            const run = async () => {
                const loadList = await getFavList();
                setFavList(loadList);
            };
            run();
        },
        []);

    return (
        <SafeAreaView style={styles.background}>
            <FlatList
                style={styles.list}
                data={favList}
                renderItem={({item, index}) => {
                    return (
                        <FavListItem
                            setFavList={setFavList}
                            item={item}
                            index={index}
                            favList={favList}
                            navigation={navigation}
                            saveFavList={saveFavList}
                        />
                    );
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F6F6F6',
        //flex: 1,
        color: '#000000',
    },
    searchBar: {
        width: 380,
    },
    list: {
        //flex: 10,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 20,
    },

});

export default FavListScreen;
