import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {GO_BACK_IMG_URI} from '../../assets/images';
import React from 'react';

export const GoBackButton = ({imgUri, goBack}) => {
    return (
        <TouchableOpacity onPress={goBack}>
            <Image style={styleGoBackButton.img} source={{uri: imgUri}}/>
        </TouchableOpacity>
    );
};

GoBackButton.defaultProps = {
    imgUri: GO_BACK_IMG_URI,
};

export const styleGoBackButton = StyleSheet.create({
    img: {
        width: 35,
        height: 35,
    },
});
