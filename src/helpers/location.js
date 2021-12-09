import React from 'react';
import {

    Platform,
} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

/**
 * Save the location
 * @param saveFunc The state function to save the data
 * @returns {Promise<void>}
 */
async function saveLocation(saveFunc) {

    const run = async (position) => {
            saveFunc(position);
    }
    await Geolocation.getCurrentPosition( run
         ,
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
}

/**
 * Doing the request for the permission
 * @param saveFunc
 * @returns {Promise<void>}
 */
async function requestLocationPermission(saveFunc) {
    let result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (result === 'granted') {
        saveLocation(saveFunc);
    }
}

/**
 * Getting the current permission
 * @param saveFunc
 * @returns {Promise<void>}
 */
async function getLocationPermission(saveFunc) {

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
                            await saveLocation(saveFunc);
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
        await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
            .then(async (result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('ANDROID This feature is not available (on this device / in this context)');
                        break;
                    case RESULTS.DENIED:
                        console.log('ANDROID The permission has not been requested / is denied but requestable');
                        await requestLocationPermission(saveFunc);
                        break;
                    case RESULTS.LIMITED:
                        console.log('ANDROID The permission is limited: some actions are possible');
                        break;
                    case RESULTS.GRANTED:
                        console.log('ANDROID The permission is granted');
                        await saveLocation(saveFunc);
                        break;
                    case RESULTS.BLOCKED:
                        console.log('ANDROID The permission is denied and not requestable anymore');
                        break;
                }
            })
            .catch((error) => {
                // …
            });
            request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((result) => {
                // …
            });
            break;
    }
}

/**
 * Function to export
 * @type {{getUserLocation: ((function(*=): Promise<void>)|*)}}
 */
const LocationHelper = {
    getUserLocation: async function getUserLocation(saveFunc) {
        await getLocationPermission(saveFunc)
    }
};

export default LocationHelper;
