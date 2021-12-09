import React from 'react';
import {

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

let locationInfos = []

async function getLocation(saveFunc) {
    console.log("get location ")

    const run = async (position) => {
            console.log("getCurrentPos" + position);
            saveFunc(position);
            //console.log("global "+ locationInfos)
            console.log(position)
            console.log(position.coords.accuracy)
    }
    await Geolocation.getCurrentPosition( run
         ,
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
    console.log("fin get location")
}

async function requestLocationPermission(saveFunc) {
    console.log("request location  permision")
    let result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log(result);
    if (result === 'granted') {
        getLocation(saveFunc);
    }
}

async function getLocationWithPermission(saveFunc) {
    console.log("get location with permision")

    switch (Platform.OS) {
        case 'ios':
            await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                .then(async (result) => {
                    switch (result) {
                        case RESULTS.UNAVAILABLE:
                            console.log('IOS This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('IOS The permission has not been requested / is denied but requestable');
                            await requestLocationPermission(saveFunc);
                            break;
                        case RESULTS.LIMITED:
                            console.log('IOS The permission is limited: some actions are possible');
                            break;
                        case RESULTS.GRANTED:
                            console.log('IOS The permission is granted');
                            await getLocation(saveFunc);
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
                            getLocation(saveFunc);
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
}

const LocationHelper = {
    getUserLocation: async function getUserLocation(saveFunc) {
        console.log("start export")
        await getLocationWithPermission(saveFunc)
        console.log("export")
        console.log(locationInfos)
        return locationInfos;
    }
};

export default LocationHelper;
