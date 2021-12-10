import React from 'react';
import {MarsImageDetails} from '../items/MarsImageDetails';
import FavListScreen from '../screens/FavListScreen';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const FavoritesNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="FavListScreen" component={FavListScreen}/>
            <Stack.Screen name="ImageDetails" component={MarsImageDetails}/>
        </Stack.Navigator>
    );
};
