import React from 'react';
import {useState, useMemo, useCallback} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import FavListItem from '../items/FavListItem';
import {useDispatch, useSelector} from "react-redux";
import {removeFavorite} from "../../redux/actions";
import {SearchBar} from "../items/SearchBar";

const getItemTitle = (roverName, cameraName) =>{
    return roverName + " - cam " + cameraName
}

const FavListScreen = props => {
    const [searchText, setSearchText] = useState('');
    const {navigation} = props;
    const favList = useSelector(state=>state.favReducer.favList)
    const state = useSelector(state=>state)
    console.log(state)
    const dispatch = useDispatch()

    const delFav = index => dispatch(removeFavorite(index));

    const favListFiltered = useMemo(() => {
        return favList.filter(fav => fav!==null && getItemTitle(fav.rover.name, fav.camera.name).includes(searchText));
    }, [favList, searchText, dispatch]);

    const deleteElement = useCallback( index => {
        delFav(favList[index].id)
    }, [favList]);

    return (
        <SafeAreaView style={styles.background}>
            <SearchBar onChangeText={setSearchText} value={searchText}/>
            <View style={styles.list}>
                <FlatList
                    data={favListFiltered}
                    renderItem={({item, index}) => {
                        return (
                            <FavListItem
                                item={item}
                                title={getItemTitle(favList[index].rover.name, favList[index].camera.name)}
                                index={index}
                                navigation={navigation}
                                deleteElement={deleteElement}
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
    list: {
        flex: 20,
    },
});

export default FavListScreen;
