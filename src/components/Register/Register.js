import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'

export default function Register() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
            />
            <TextInput
                style={styles.input}
                placeholder='Mot de passe'
                secureTextEntry={true} 
            />
            <TextInput
                style={styles.input}
                placeholder='Confirmez votre mot de passe'
                secureTextEntry={true} 
            />
            <Pressable>
                <Text style={styles.pressable}>Déjà inscrit ?</Text>
            </Pressable>
            <Button
                title='Envoyer'
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