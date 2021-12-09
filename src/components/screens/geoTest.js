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
    //const [permission, setpermisson] = useState("");

    const getUserLocation = useCallback(async() => {
        console.log("component callback location")
        let result = await LocationHelper.getUserLocation()
        console.log("fin component" + result)
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

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
});


export default GeoTest;
