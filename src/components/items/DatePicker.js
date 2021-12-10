import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Modal, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {dateFilterFrench} from '../../assets/js/commonFunction';
import {Platform} from 'react-native';

export const DatePicker = ({value, setValue}) => {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || value;
        setShow(Platform.OS === 'ios');
        setValue(currentDate);
        setShow(false);
    };

    return (
        <View style={[stylesDatePicker.main, stylesDatePicker.fullHeight]}>
            <TouchableOpacity style={[stylesDatePicker.button, stylesDatePicker.fullHeight]} onPress={showDatepicker}
                              title="Show date picker!">
                <Text style={[stylesDatePicker.font]}>{dateFilterFrench(value)}</Text>
            </TouchableOpacity>
            {show && (
                <Modal
                    transparent={true}
                    visible={show}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={value}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={stylesDatePicker.datePiker}
                    />
                </Modal>
            )}
        </View>
    );
};

export const stylesDatePicker = StyleSheet.create({
    datePiker: {
        backgroundColor: '#D7DEDEDE',
        width: '100%',
        position: 'absolute',
        height: '100%',
    },
    button: {
        backgroundColor: '#D7DEDEDE',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 1,
    },
    fullHeight: {
        height: '100%',
    },
    font: {
        fontSize: 16,
        color: 'black',
    },
});

