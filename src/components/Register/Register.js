import React, {useState, useEffect, useMemo} from 'react';
import {Text, TextInput, View, StyleSheet, Button, Pressable, Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterLoginNavigator} from '../navigators/RegisterLoginNavigator';

const Stack = createNativeStackNavigator();

export default function Register({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isValidConfirm, setIsValidConfirm] = useState(false);

    const onChangePassword = (val) => {
        setPassword(val);
    };
    const onChangePasswordConfirm = (val) => {
        setPasswordConfirm(val);
    };

    const onChangeEmail = (val) => {
        setEmail(val);
    };

    const checkPassword = useMemo(() => {
        setIsValid(password.length > 5);
    }, [password]);

    const checkPasswordConfirm = useMemo(() => {
        setIsValidConfirm(password === passwordConfirm);
    }, [password, passwordConfirm]);

    // Créer un user en passant l'email et le mot de passe à la fonction de firebase
    const createUser = () => {
        // Si les mots de passe ne correspondent pas, envoie une alerte et ne crée pas l'user
        if (password !== passwordConfirm) {
            Alert.alert(
                'Attention',
                'Les mots de passe de correspondent pas !',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
            );
            // si les mdp correspondent et que l'email n'est pas déjà utilisé, crée l'user
        } else if (email === '' || password === '' || passwordConfirm === '') {
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
        } else if (password === passwordConfirm) {
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                    navigation.navigate('AppTabNavigator');
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            Alert.alert('Email already in use !');
                            break;
                        case 'auth/invalid-email':
                            Alert.alert('Invalid email !');
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
            <Text style={styles.title}>Register</Text>
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
                style={isValid ? styles.input : styles.inputError}
                placeholder="Mot de passe"
                placeholderTextColor="#adb5bd"
                secureTextEntry={true}
            />
            <TextInput
                value={passwordConfirm}
                onChangeText={onChangePasswordConfirm}
                style={isValidConfirm ? styles.input : styles.inputError}
                placeholder="Confirmez votre mot de passe"
                placeholderTextColor="#adb5bd"
                secureTextEntry={true}
            />
            <Pressable
                onPress={() =>
                    navigation.navigate('Login')}
            >
                <Text style={styles.pressable}>Déjà inscrit ?</Text>
            </Pressable>
            <Button
                title="Envoyer"
                onPress={createUser}
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
    inputError: {
        height: 40,
        marginBottom: 30,
        borderColor: 'red',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
    },
    pressable: {
        textAlign: 'center',
        marginBottom: 30,
        color: 'black',
    }
})
