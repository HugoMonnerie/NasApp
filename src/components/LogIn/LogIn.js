import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'

import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterLoginNavigator } from '../navigators/RegisterLoginNavigator';
import { AppTabNavigator } from '../navigators/AppTabNavigator';

const Stack = createNativeStackNavigator();

export default function LogIn({navigation}) {

    const [email, setEmail] = useState([

    ])
    const [password, setPassword] = useState([

    ])

    const onChangePassword = (val) =>{
        setPassword(val)
    }

    const onChangeEmail = (val) =>{
        setEmail(val)
    }

    // Déconnexion
    const LogOut = () => {
        auth()
        .signOut()
        .then(() => navigation.navigate('Register'));
    }

    // Fonction de connexion fournie par firebase qui va vérifier si l'user existe 
    const LogIn = () => {
        auth()
        .signInWithEmailAndPassword(email, password)
        // si l'user existe et que les logins sont justes, le connecte
        .then(() => {
            console.log('User signed in !');
            navigation.navigate('AppTabNavigator')
        })
        .catch(error => {
            if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            }

            console.error(error);
        });
    }

        // Set an initializing state whilst Firebase connects
        const [initializing, setInitializing] = useState(true);
        const [user, setUser] = useState();
      
        // Handle user state changes
        function onAuthStateChanged(user) {
          setUser(user);
          if (initializing) setInitializing(false);
        }
      
        useEffect(() => {
          const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
          return subscriber; // unsubscribe on unmount
        }, []);
      
        if (initializing) return null;
      
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                value={email}
                onChangeText={onChangeEmail}
                style={styles.input}
                placeholder='Email'
            />
            <TextInput
                value={password}
                onChangeText={onChangePassword}
                style={styles.input}
                placeholder='Mot de passe'
                secureTextEntry={true} 
            />
            <Pressable
                onPress={() =>
                    navigation.navigate('Register')}
            >
                <Text style={styles.pressable}>Pas encore de compte ?</Text>
            </Pressable>
            <Button
                title='Envoyer'
                onPress={LogIn}
            />
        </View>    
    )
}

const styles = StyleSheet.create({
    container:{
        margin:30
    },
    title:{
        textAlign:'center',
        marginBottom:40,
        fontSize:26,
    },
    input:{
        height:40,
        marginBottom:30,
        borderColor:'grey',
        borderRadius:5,
        borderWidth:1,
        padding:10,
    },
    pressable:{
        textAlign:'center',
        marginBottom:30,
    }
})