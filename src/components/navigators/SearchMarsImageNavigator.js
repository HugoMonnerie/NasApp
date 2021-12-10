import React from 'react';
import {SearchMarsImage} from '../screens/SearchMarsImage';
import {MarsImageDetails} from '../items/MarsImageDetails';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';

const Stack = createStackNavigator();

export const SearchMarsImageNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SearchImage" component={SearchMarsImage}/>
            <Stack.Screen name="ImageDetails" component={MarsImageDetails}/>
        </Stack.Navigator>
    );
};
