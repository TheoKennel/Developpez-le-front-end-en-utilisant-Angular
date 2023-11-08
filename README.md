![Angular Logo](https://angular.io/assets/images/logos/angular/angular.png)

# Développez le Front-End en Utilisant Angular

Ce projet est une application Angular conçue dans le cadre d'un cours sur OpenClassrooms. Elle illustre le développement d'une application front-end robuste en utilisant le framework Angular.

## Table des Matières

- [Structure du Projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage de l'Application](#démarrage-de-lapplication)
- [Tests](#tests)
- [Contribution](#contribution)
- [Licence](#licence)

## Structure du Projet

Le projet est structuré comme suit :

- `src/`: Contient le code source de l'application, y compris les templates HTML, les styles SCSS, et les scripts TypeScript.
  - `app/`: Le cœur de l'application Angular, contenant les composants, les services, et les modèles.
    - `core/`: Contient les services et modèles centraux de l'application.
      - `models/`: Définitions des modèles de données.
      - `services/`: Services Angular pour la logique métier.
    - `pages/`: Composants représentant les pages de l'application.
      - `home/`: Page d'accueil de l'application.
      - `details-page/`: Page de détails montrant plus d'informations.
      - `not-found/`: Page affichée lorsqu'une route n'est pas trouvée.
  - `assets/`: Ressources statiques comme les images et les fichiers de style globaux.
  - `environments/`: Fichiers de configuration pour les différents environnements de déploiement.

## Prérequis

- ![Node.js Logo](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg)
- ![NPM Logo](https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg)
- ![Angular CLI](https://angular.io/assets/images/logos/angular/angular.svg)

## Installation

Pour installer les dépendances, exécutez la commande suivante :

```bash
npm install
