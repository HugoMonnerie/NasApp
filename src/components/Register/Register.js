import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Pressable, Alert } from 'react-native'

import auth from '@react-native-firebase/auth';

export default function Register() {

    const [email, setEmail] = useState([

    ])
    const [password, setPassword] = useState([

    ])
    const [passwordConfirm, setPasswordConfirm] = useState([

    ])

    const onChangePassword = (val) =>{
        setPassword(val)
    }
    const onChangePasswordConfirm = (val) =>{
        setPasswordConfirm(val)
    }

    const onChangeEmail = (val) =>{
        setEmail(val)
    }

    // Créer un user en passant l'email et le mot de passe à la fonction de firebase
    const createUser = () => {
        // Si les mots de passe ne correspondent pas, envoie une alerte et ne crée pas l'user
        if(password !== passwordConfirm){
            Alert.alert(
                "Attention",
                "Les mots de passe de correspondent pas !",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
              // si les mdp correspondent et que l'email n'est pas déjà utilisé, crée l'user
        }else if (password === passwordConfirm){
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
        }
        
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
            <Text style={styles.title}>Register</Text>
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
            <TextInput
                value={passwordConfirm}
                onChangeText={onChangePasswordConfirm}
                style={styles.input}
                placeholder='Confirmez votre mot de passe'
                secureTextEntry={true} 
            />
            <Pressable>
                <Text style={styles.pressable}>Déjà inscrit ?</Text>
            </Pressable>
            <Button
                title='Envoyer'
                onPress={createUser}
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