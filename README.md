# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Explication du projet 

Le projet est composé de 3 pages :
- La page de login
- La page d'accueil
- La page de détail

La page de login permet de se connecter à l'application.
La page d'accueil permet de voir tous les produits de l'API.
Cette page d'accueil est découpé en 3 parties :
- Le Header : navigation entre les pages et la barre de recherche
- Le Body : liste des produits
- Le Footer : pagination

La page de détail permet de voir les détails d'un produit.

### Explication du code

Le code est découpé en 4 parties :
- Le dossier components : contient tous les composants de l'application
- Le dossier router : contient tous les routes de l'application
- Le dossier stores : contient l'appel à l'API
- Le dossier assets : contient les images et les styles