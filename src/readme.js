export const readmeContent = "# NasApp\n" +
    "\n" +
    "## Sommaire\n" +
    "1. [Informations générales](#informations-générales)\n" +
    "    - [Présentation](#présentation)\n" +
    "    - [Technologies](#technologies)\n" +
    "    - [Auteurs](#auteurs)\n" +
    "2. [Démarrage](#démarrage)\n" +
    "3. [Api](#api)\n" +
    "3. [Fonctionnalités](#fonctionnalités)\n" +
    "    - [Présentation](#présentation)\n" +
    "    - [Image de mars](#image-de-mars)\n" +
    "    - [Image de la terre](#image-de-la-terre)\n" +
    "    \n" +
    "    \n" +
    "## Informations générales\n" +
    "\n" +
    "### Présentation\n" +
    "Application mobile sous react-native permettant :\n" +
    "- de visualiser des photos de Mars depuis une API de la Nasa\n" +
    "\n" +
    "- de voir des photos satellites de la terre en fonction de la date \n" +
    "et de la géolocalisation\n" +
    "\n" +
    "- de montrer la photo du jour de l'API de la Nasa sur la page d'accueil\n" +
    "\n" +
    "### Technologies\n" +
    "\n" +
    "- React\n" +
    "- react-native\n" +
    "- Firebase\n" +
    "- react-native-firebase\n" +
    "- react-native-permissions\n" +
    "- react-native-geolocation-service\n" +
    "- axios\n" +
    "- react-native-navigation\n" +
    "- Redux\n" +
    "- redux-persist\n" +
    "- AsyncStorage\n" +
    "- react-native-datepicker\n" +
    "- esLint\n" +
    "\n" +
    "### Auteurs\n" +
    "\n" +
    "- Gwenaël MARCHETTI-WATERNAUX\n" +
    "- Alyssia PRÉVOTÉ--HAUGUEL\n" +
    "- Hugo MONNERIE\n" +
    "- Antoine HALLER\n" +
    "\n" +
    "## Démarrage\n" +
    "\n" +
    "- Cloner le projet \n" +
    "- Installer les modules node et ios nécessaires avec `npm install` puis `cd ios && pod install && cd ..`\n" +
    "\n" +
    "## API\n" +
    "\n" +
    "Nous utilisons l'Api de la NASA : https://api.nasa.gov\n" +
    "\n" +
    "Ci-dessous, les 3 routes de l'API utilisé :\n" +
    "- image de mars : https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos\n" +
    "- image de la terre : https://api.nasa.gov/planetary/earth/imagery\n" +
    "- image du jour : https://api.nasa.gov/planetary/apod\n" +
    "\n" +
    "## Fonctionnalités\n" +
    "\n" +
    "### Home\n" +
    "La page home affiche une image du jour proposé par la NASA\n" +
    "\n" +
    "### Image de mars\n" +
    "La page SearchMars permet de chercher une image de mars\n" +
    "en fonction d'un rovers, d'une camera et d'une date sélectionner via des \n" +
    "pickers\n" +
    "\n" +
    "### Image de la terre\n" +
    "La page SearchEarth permet de chercher une image de la terre en utilisant \n" +
    "la géolocalisation de l'apareil à une date, avec possibilité de 'zoomé' l'image\n" +
    "via un slider. Ce zoom proposé par l'api applique une rotation a l'image, ce\n" +
    "qui peut conduire à une image partiellement complète.\n" +
    "\n" +
    "Noté que les images ne sont pas disponibles à la date d'aujourd'hui, \n" +
    "il faut remonter plusieurs jours voir plusieurs semaines en arrière pour \n" +
    "avoir une chance d'en voir une.\n" +
    "\n" +
    "\n" +
    "\n"