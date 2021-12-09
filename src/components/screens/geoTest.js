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
    Platform,
} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import LocationHelper from '../../helpers/location'

const GeoTest = props => {

    const [userLocationInfos, setUserLocationInfos] = useState("")

    //const [permission, setpermisson] = useState("");

    const getUserLocation = useCallback(async() => {
        await LocationHelper.getUserLocation(setUserLocationInfos)
    }, []);


    useEffect(() => {
            const run = async () => {
                await getUserLocation();
            };
            run();
        },
        []);


    return (
        <SafeAreaView style={styles.background}>
            <Text>**Coord**</Text>
            <Text>Accuracy : {userLocationInfos !== "" ? userLocationInfos.coords.accuracy : 'No'}</Text>
            <Text>Altitude : {userLocationInfos !== "" ? userLocationInfos.coords.altitude : 'No'}</Text>
            <Text>Altitude Accuracy : {userLocationInfos !== "" ? userLocationInfos.coords.altitudeAccuracy : 'No'}</Text>
            <Text>Heading : {userLocationInfos !== "" ? userLocationInfos.coords.heading : 'No'}</Text>
            <Text>Latitude : {userLocationInfos !== "" ? userLocationInfos.coords.latitude : 'No'}</Text>
            <Text>Longitude : {userLocationInfos !== "" ? userLocationInfos.coords.longitude : 'No'}</Text>
            <Text>Speed : {userLocationInfos !== "" ? userLocationInfos.coords.speed : 'No'}</Text>
            <Text>TimeStampp : {userLocationInfos !== "" ? userLocationInfos.timestamp : 'No'}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
});


export default GeoTest;
