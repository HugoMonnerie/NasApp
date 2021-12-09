import React from 'react';
import { View, StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker';

export const PickerCustom = ({dataList, value, onSelect}) => {
    return (
        <View style={stylesPickerCustom.main}>
            <Picker selectedValue={value} onValueChange={onSelect} >
                {
                    dataList.map((item, itemIndex) => {
                        return (<Picker.Item label={item.label} value={item.value} id={itemIndex} key={itemIndex}/>)
                    })
                }
            </Picker>
        </View>
    )
}

PickerCustom.defaultProps =  {
    value : null,
    dataList:[]
}

const stylesPickerCustom = StyleSheet.create({
    main:{
        backgroundColor:"#D7DEDEDE",
        width:"100%",
        flex:1,
        borderColor:"black",
        borderRightWidth:1,
        borderStyle:"solid"
    }
})