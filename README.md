# NasApp

## Sommaire
1. [Informations générales](#informations-générales)
    - [Présentation](#présentation)
    - [Technologies](#technologies)
    - [Auteurs](#auteurs)
2. [Démarrage](#démarrage)
3. [Api](#api)
3. [Fonctionnalités](#fonctionnalités)
    - [Présentation](#présentation)
    - [Image de mars](#image-de-mars)
    - [Image de la terre](#image-de-la-terre)
    
    
## Informations générales

### Présentation
Application mobile sous react-native permettant :
- de visualiser des photos de Mars depuis une API de la Nasa

- de voir des photos satellites de la terre en fonction de la date 
et de la géolocalisation

- de montrer la photo du jour de l'API de la Nasa sur la page d'accueil

### Technologies

- React
- react-native
- Firebase
- react-native-firebase
- react-native-permissions
- react-native-geolocation-service
- axios
- react-native-navigation
- Redux
- redux-persist
- AsyncStorage
- react-native-datepicker
- esLint

### Auteurs

- Gwenaël MARCHETTI-WATERNAUX
- Alyssia PRÉVOTÉ-HAUGUEL
- Hugo MONNERIE
- Antoine HALLER

## Démarrage

- Cloner le projet 
- Installer les modules node et ios nécessaires avec `npm install` puis `cd ios && pod install && cd ..`

## API

Nous utilisons l'Api de la NASA : https://api.nasa.gov

Ci-dessous, les 3 routes de l'API utilisé :
- image de mars : https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos
- image de la terre : https://api.nasa.gov/planetary/earth/imagery
- image du jour : https://api.nasa.gov/planetary/apod

## Fonctionnalités

### Home
La page home affiche une image du jour proposé par la NASA

### Image de mars
La page SearchMars permet de chercher une image de mars
en fonction d'un rovers, d'une camera et d'une date sélectionner via des 
pickers

### Image de la terre
La page SearchEarth permet de chercher une image de la terre en utilisant 
la géolocalisation de l'apareil à une date, avec possibilité de 'zoomé' l'image
via un slider. Ce zoom proposé par l'api applique une rotation a l'image, ce
qui peut conduire à une image partiellement complète.

Noté que les images ne sont pas disponibles à la date d'aujourd'hui, 
il faut remonter plusieurs jours voir plusieurs semaines en arrière pour 
avoir une chance d'en voir une.



