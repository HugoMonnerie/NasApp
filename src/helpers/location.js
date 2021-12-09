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

type Rationale = {
    title: 'Titre';
    message: 'Message';
    buttonPositive?: 'BtnPos';
    buttonNegative?: 'BtnNeg';
    buttonNeutral?: 'BtnNeutral';
};

function getLocation() {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
}

async function requestLocationPermission() {

    let result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log(result);
    if(result === "granted"){
        getLocation();
    }
}

const LocationHelper = {
    getLocationWithPermission: async function getLocationWithPermission() {
        switch (Platform.OS) {
            case 'ios':
                check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                    .then((result) => {
                        switch (result) {
                            case RESULTS.UNAVAILABLE:
                                console.log('IOS This feature is not available (on this device / in this context)');
                                break;
                            case RESULTS.DENIED:
                                console.log('IOS The permission has not been requested / is denied but requestable');
                                requestLocationPermission();
                                break;
                            case RESULTS.LIMITED:
                                console.log('IOS The permission is limited: some actions are possible');
                                break;
                            case RESULTS.GRANTED:
                                console.log('IOS The permission is granted');
                                getLocation();
                                break;
                            case RESULTS.BLOCKED:
                                console.log('IOS The permission is denied and not requestable anymore');
                                break;
                        }
                    })
                    .catch((error) => {
                        // …
                    });
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
                    // …
                });
                break;
            case 'android':
                check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
                    .then((result) => {
                        switch (result) {
                            case RESULTS.UNAVAILABLE:
                                console.log('ANDROID This feature is not available (on this device / in this context)');
                                break;
                            case RESULTS.DENIED:
                                console.log('ANDROID The permission has not been requested / is denied but requestable');
                                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {
                                    console.log(result);
                                });
                                break;
                            case RESULTS.LIMITED:
                                console.log('ANDROID The permission is limited: some actions are possible');
                                break;
                            case RESULTS.GRANTED:
                                console.log('ANDROID The permission is granted');
                                getLocation();
                                break;
                            case RESULTS.BLOCKED:
                                console.log('ANDROID The permission is denied and not requestable anymore');
                                break;
                        }
                    })
                    .catch((error) => {
                        // …
                    });
        }
    },

};

export default LocationHelper;
