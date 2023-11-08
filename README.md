![Angular Logo](https://angular.io/assets/images/logos/angular/angular.png)

# Développez le Front-End en Utilisant Angular

Ce projet est une application Angular conçue dans le cadre d'un cours sur OpenClassrooms. Elle illustre le développement d'une application front-end robuste en utilisant le framework Angular.

## Table des Matières

- [Structure du Projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Build](#build)
- [Démarrage de l'Application](#démarrage-de-lapplication)
- [Dépendance](#dependance)

## Structure du Projet

Le projet est structuré comme suit :

- `src/`: Contient le code source de l'application, y compris les templates HTML, les styles SCSS, et les scripts TypeScript.
  - `app/`: Le cœur de l'application Angular, contenant les composants, les services, et les modèles.
    - `core/`: Contient les services et modèles centraux de l'application.
      - `models/`: Définitions des modèles de données.
      - `services/`: Services Angular pour la logique métier.
    - `pages/`: Composants représentant les pages de l'application.
      - `home/`: Page d'accueil de l'application.
        - `home-pie-grap`: Component pour le graphique pie de la home page.   
      - `details-page/`: Page montrant les informations celon un pays spécifique.
        - `details-page-line-grap`: Component pour le graphique line de la page details.
      - `not-found/`: Page affichée lorsqu'une route n'est pas trouvée.
  - `assets/`: Dossier qui contient les données JSON pour les graphiques.

## Prérequis

- Node.js
- npm ou yarn
- Angular CLI

## Installation

Pour installer les dépendances, exécutez la commande suivante :

npm install / yarn install

## Build

Run ng build pour build le project.

## Démarrage de l'Application 
Pour lancer l'application en mode développement, utilisez :

ng serve

Ouvrez votre navigateur et accédez à http://localhost:4200/.

## Dépendance

Utilisation de NGX-Charts pour les graphiques (pie et line)

https://swimlane.github.io/ngx-charts/#/ngx-charts/pie-chart
