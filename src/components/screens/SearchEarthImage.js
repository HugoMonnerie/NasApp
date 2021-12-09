import React, {useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Text, Image} from 'react-native';
import apiNasa from "../../assets/js/api";

//yarn add @react-native-community/datetimepicker
import {DatePicker} from "../items/DatePicker";
//yarn add react-native-vector-icons //for icons (ex calendar), be aware, need many install for iOS & android https://www.npmjs.com/package/react-native-vector-icons
import {dateFilter} from "../../assets/js/commonFunction";

//yarn add @ptomasroos/react-native-multi-slider
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {EarthImageSection} from "../items/EarthImageSection";
import {BG_IMG_EARTH_URI, EARTH_SLIDER_MARKER_IMG_URI} from "../../assets/images";

export const SearchEarthImage = props => {
    const [searchDate, setSearchDate] = useState(new Date())
    const [zoom, setZoom] = useState([50])
    const [currentZoom, setCurrentZoom] = useState([50])
    const [imgUri, setImgUri] = useState(null)
    const [imgErr, setImgErr] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {navigation} = props

    const apiNasaEarth = useCallback(async ()=>{
        setIsLoading(true)
        const params =   {lat:29.78, lon:-94.33, date:dateFilter(searchDate), dim:zoom[0]/100}
        const url = apiNasa.apiNasaEarthImgUri(params)
        const res = await apiNasa.apiNasaEarth(params)
        if(res.error){
            setImgErr(true)
        }
        else{
            setImgErr(false)
            setImgUri(url)
        }
        setIsLoading(false)

    },[searchDate, zoom])

    useEffect(()=>{
        apiNasaEarth()
    }, [searchDate, zoom])

    const renderCustomLabel = useCallback(()=>{
        return (<Text style={stylesEarthImage.font}>zoom : {currentZoom}</Text>)
    },[currentZoom])

    const renderCustomMarker = ()=>{
        return (<Image style={stylesEarthImage.marker} source={{uri:EARTH_SLIDER_MARKER_IMG_URI}}/>)
    }

    return (
        <SafeAreaView style={[stylesEarthImage.main]}>
            <ImageBackground source={{uri:BG_IMG_EARTH_URI}} resizeMode="cover" style={[stylesEarthImage.main, stylesEarthImage.fullWidth]}>
                <EarthImageSection imgErr={imgErr} isLoading={isLoading} imgUri={imgUri} textStyle={stylesEarthImage.font}/>
                <View style={stylesEarthImage.pickers}>
                    <MultiSlider style={stylesEarthImage.slider}
                                 onValuesChange={setCurrentZoom}
                                 onValuesChangeFinish={setZoom}
                                 values={zoom}
                                 step={1}
                                 max={100}
                                 min={1}
                                 enableLabel={true}
                                 customLabel={renderCustomLabel}
                                 customMarker={renderCustomMarker}
                    />
                    <DatePicker value={searchDate} setValue={setSearchDate}/>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export const stylesEarthImage = StyleSheet.create({
    main:{
        justifyContent:"space-between",
        alignItems:"center",
        height:"100%"
    },
    fullWidth:{
        width:"100%"
    },
    pickers:{
        flexDirection:"row",
        maxHeight: 60
    },
    slider:{
        flex:1,
        width:"100%"
    },
    font:{
        color:"white",
        fontSize:16
    },
    marker:{
        width:30,
        height:30
    }
})
