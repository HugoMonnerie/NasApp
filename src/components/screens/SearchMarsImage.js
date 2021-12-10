import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, FlatList, SafeAreaView, ImageBackground} from 'react-native';
import apiNasa from "../../assets/js/api";

//@todo for iOS
//yarn add @react-native-picker/picker
//npx pod-install
//pod install
import { PickerCustom } from "../items/PickerCustom";
import {MarsImageItem} from "../items/MarsImageItem";

//yarn add @react-native-community/datetimepicker
import {DatePicker} from "../items/DatePicker";
//yarn add react-native-vector-icons //for icons (ex calendar), be aware, need many install for iOS & android https://www.npmjs.com/package/react-native-vector-icons
import {dateFilter} from "../../assets/js/commonFunction";
import {BG_IMG_MARS_URI} from "../../assets/images";
import {CAMERA} from "../../../config/camera";
import {ROVERS} from "../../../config/rovers";

export const SearchMarsImage = props => {
    const [photosList, setPhotosList] = useState([]) // array of object
    const [searchDate, setSearchDate] = useState(new Date())
    const [searchRovers, setSearchRovers] = useState(ROVERS[0].value)
    const [searchCamera, setSearchCamera] = useState(CAMERA[0].value)

    const {navigation} = props

    const renderItem = ({ item, index }) => (
        <MarsImageItem name={item.camera.name} id={item.id} index={index} earthDate={item.earth_date}
                       imgSrc={item.img_src} goto={goToDetailsImage} roverName={item.rover.name}/>
    );

    const goToDetailsImage = useCallback((index)=>{
        navigation.navigate("ImageDetails", {photoData:photosList[index], index:index})
    },[navigation, photosList])

    const apiNasaMars = useCallback(async ()=>{
        const params = {rover:searchRovers, sol:1000, camera:searchCamera, earth_date:dateFilter(searchDate)}
        const res = await apiNasa.apiNasaMarsByRovers(params)
        //console.log(res.photos[0].img_src);
        setPhotosList(res && res.photos ? res.photos : [])
    },[searchRovers, searchCamera, searchDate])

    useEffect(()=>{
        apiNasaMars()
    }, [searchCamera, searchRovers, searchDate])

    return (
        <SafeAreaView style={[stylesSearchImage.flexBetween, stylesSearchImage.height100,stylesSearchImage.container]}>
            <ImageBackground source={{uri:BG_IMG_MARS_URI}} resizeMode="cover" style={[stylesSearchImage.flexBetween, stylesSearchImage.height100,stylesSearchImage.container, stylesSearchImage.image]}>
                <View style={stylesSearchImage.pickers}>
                    <PickerCustom dataList={CAMERA} value={searchCamera} onSelect={setSearchCamera}/>
                    <PickerCustom dataList={ROVERS} value={searchRovers} onSelect={setSearchRovers}/>
                    <DatePicker value={searchDate} setValue={setSearchDate}/>
                </View>
                <FlatList style={stylesSearchImage.flatlist}
                    data={photosList}
                    renderItem={renderItem}
                />
            </ImageBackground>
        </SafeAreaView>
    );
}

export const stylesSearchImage = StyleSheet.create({
    flexBetween:{
        justifyContent:"space-between",
        alignItems:"center"
    },
    height100:{
        height:"100%"
    },
    pickers:{
        flexDirection:"row",
        maxHeight: 50
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        //flex: 1,
    },
    flatlist: {
        width:'100%',
        //paddingTop: 100,
    }
})
