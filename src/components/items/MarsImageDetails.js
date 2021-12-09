import React, {useCallback} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {dateFilterFrench} from "../../assets/js/commonFunction";

/**
    * {
 *      "id":102693,
 *      "sol":1000,
 *      "camera":{
 *          "id":20,
 *          "name":"FHAZ",
 *          "rover_id":5,
 *          "full_name":"Front Hazard Avoidance Camera"
 *      },
 *      "img_src":"http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
 *      "earth_date":"2015-05-30",
 *      "rover":{
 *          "id":5,
 *          "name":"Curiosity",
 *          "landing_date":"2012-08-06",
 *          "launch_date":"2011-11-26",
 *          "status":"active"
 *          }
 *       }
 */
export const MarsImageDetails = ({route, navigation}) =>{
    const {index, photoData} = route.params

    const goBack = useCallback(()=>{
        navigation.goBack()
    },[navigation])

    return (
        <SafeAreaView style={styleMarsImageDetails.main}>
            <ScrollView style={[styleMarsImageDetails.fullHeight]}>
                <Image style={styleMarsImageDetails.img} source={{uri: photoData.img_src}}/>
                <View>
                    <View style={styleMarsImageDetails.block}>
                        <Text>Photo date : {dateFilterFrench(photoData.earth_date)}</Text>
                        <Text>Photo id : {photoData.id}</Text>
                    </View>
                    <View style={styleMarsImageDetails.block}>
                        <Text>Camera : {photoData.camera.full_name} ({photoData.camera.name})</Text>
                    </View>
                    <View style={styleMarsImageDetails.block}>
                        <Text>Rover : {photoData.rover.name}</Text>
                        <Text>Launch date : {dateFilterFrench(photoData.rover.launch_date)}</Text>
                        <Text>Landing date : {dateFilterFrench(photoData.rover.landing_date)}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={goBack}>
                    <Text>return</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}


export const styleMarsImageDetails = StyleSheet.create({
    main:{
        height:"100%"
    },
    block:{
        marginTop:10
    },
    img:{
        width:"100%",
        minHeight:200,
        flex:1
    },
    fullHeight:{
        height:"100%"
    }
})
