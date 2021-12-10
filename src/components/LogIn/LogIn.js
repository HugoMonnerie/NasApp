import React, {useState, useEffect, useCallback} from 'react';
import {Text, TextInput, View, StyleSheet, Button, Pressable, Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterLoginNavigator} from '../navigators/RegisterLoginNavigator';
import {AppTabNavigator} from '../navigators/AppTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../../redux/actions';

const Stack = createNativeStackNavigator();

export default function LogIn({navigation}) {
    const userMail = useSelector(state => Object.keys(state.userReducer.users)[0]);
    const [email, setEmail] = useState(userMail || '');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onChangePassword = (val) => {
        setPassword(val);
    };

    const onChangeEmail = (val) => {
        setEmail(val);
    };

    const addUserLogin = mail => dispatch(addUser(mail));

    const addToUserLogin = useCallback(() => {
        console.log('add a new user');
        addUserLogin(email);
    }, [email]);


    // Déconnexion
    const LogOut = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Register'));
    };

    // Fonction de connexion fournie par firebase qui va vérifier si l'user existe
    const LogIn = () => {
        if (email === '' || password === '') {
            Alert.alert(
                'Attention',
                'Tous les champs doivent être remplis >:( ',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
            );
        } else {
            auth()
                .signInWithEmailAndPassword(email, password)
                // si l'user existe et que les logins sont justes, le connecte
                .then(() => {
                    addToUserLogin();
                    console.log('User signed in !');
                    navigation.navigate('AppTabNavigator');
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            Alert.alert('Invalid email !');
                            break;
                        case 'auth/user-not-found':
                            Alert.alert('User not found !');
                            break;
                    }
                });
        }

    };

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                value={email}
                onChangeText={onChangeEmail}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#adb5bd"
            />
            <TextInput
                value={password}
                onChangeText={onChangePassword}
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#adb5bd"
                secureTextEntry={true}
            />
            <Pressable
                onPress={() =>
                    navigation.navigate('Register')}
            >
                <Text style={styles.pressable}>Pas encore de compte ?</Text>
            </Pressable>
            <Button
                title="Envoyer"
                onPress={LogIn}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 200,
    },
    title: {
        textAlign: 'center',
        marginBottom: 40,
        fontSize: 26,
        color: 'black',
    },
    input: {
        height: 40,
        marginBottom: 30,
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        color: 'black',
    },
    pressable: {
        textAlign: 'center',
        marginBottom: 30,
        color: 'black'
    }
})
