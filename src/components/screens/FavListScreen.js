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
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {useDispatch, useSelector} from 'react-redux';
import FavListItem from '../items/FavListItem';
import {useDispatch, useSelector} from "react-redux";

const FavListScreen = props => {
    const [searchText, setSearchText] = useState('');
    const favList = useSelector(state=>state.favList)
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
    const dispatch = useDispatch()

    const delFav = useCallback((index)=>{
        dispatch({type:"DEL_FAV", value:index})
    }, [dispatch])
    const initFav = useCallback((list)=>{
        dispatch({type:"INIT_FAV_LIST", list:list})
    }, [dispatch])

    const favListFiltered = useMemo(() => {
        return favList.filter(fav => (fav.rover.name + " - cam " + fav.camera.name).includes(searchText));
    }, [favList, searchText]);

    const saveFavList = async value => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@favList', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const getFavList = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@favList');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            return [];
        }
    };
    /*const deleteElement = useCallback( index => {
        let newList = [...favList];
        newList.splice(index, 1);
        delFav(favList[index].id)
        saveFavList(newList);
    }, [favList]);*/

    const {navigation} = props;

    useEffect(() => {
            const run = async () => {
                const loadList = await getFavList();
                initFav(loadList)
            };
            run();
        //setFavList(getStateFavList())
        },[]);

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.searchBar}>
                <Image style={styles.searchImage} source={{uri: 'https://www.pngall.com/wp-content/uploads/8/Vector-Search.png'}}/>
                <TextInput
                    placeholder={'Rechercher'}
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                />
            </View>
            <View style={styles.list}>
            <FlatList
                data={favListFiltered}
                renderItem={({item, index}) => {
                    return (
                        <FavListItem
                            setFavList={()=>{}}
                            item={item}
                            index={index}
                            favList={favList}
                            navigation={navigation}
                            saveFavList={saveFavList}
                            removeFromStore={delFav}
                        />
                    );
                }}
            />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F6F6F6',
        flex: 1,
    },
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
    list: {
        flex: 20,
    },

});


export default FavListScreen;
