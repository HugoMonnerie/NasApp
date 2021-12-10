import {Image, StyleSheet, Text, View} from 'react-native';
// yarn add react-native-indicator
// yarn add @react-native-community/art
import {CirclesRotationScaleLoader} from 'react-native-indicator';
import React from 'react';

export const EarthImageSection = ({isLoading, imgErr, imgUri, textStyle}) => {
    return (
        <View style={[stylesEarthImageSection.main]}>
            {
                isLoading ? <CirclesRotationScaleLoader/>
                    :
                    imgErr
                        ? <Text style={textStyle}>No image found for this date</Text>
                        : <Image style={stylesEarthImageSection.img} source={{uri: imgUri}}/>
            }
        </View>
    );
};

export const stylesEarthImageSection = StyleSheet.create({
    img: {
        width: '100%',
        minHeight: 300,
        flex: 1,
    },
    main: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
