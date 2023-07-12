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

Le projet est composé de **3 pages** :
- La page de login
- La page d'accueil
- La page de détail

La page de login permet de se connecter à l'application.
Voici les identifiants pour se connecter :

email: bobby@bob.com

mot de passe: bobby1234

La page d'accueil permet de voir tous les produits de l'API.
Cette page d'accueil est découpé en **3 parties** :
- Le Header : navigation entre les pages et la barre de recherche
- Le Body : liste des produits
- Le Footer : pagination

La page de détail permet de voir les détails d'un produit.

### Explication du code

#### _structure du code_

Le code est découpé en **4 parties** :
- Le dossier components : contient tous les composants de l'application
- Le dossier router : contient tous les routes de l'application
- Le dossier stores : contient l'appel à l'API
- Le dossier assets : contient les images et les styles

### Explication des composants (Résumé)

**:warning: ( tout est commenté dans le code) :warning:**

#### **App.vue**
Le composant App.vue est le composant principal de l'application.
Il contient le router-view qui permet de naviguer entre les pages.
Il contient aussi le composant Header qui est le header de l'application.
La méthode _updateSearchQuery_ permet de mettre à jour la query de recherche.

#### **Header.vue**

Le composant Header.vue est le header de l'application.
Il contient le logo les liens vers les pages et la barre de recherche.
La barre de recherche permet de rechercher un produit par son nom.

Pour cela on utilise un _v-text-field_ avec un _v-model_ qui permet de mettre à jour la query de recherche.
Elle contient également un _@input_ qui permet de mettre à jour la query de recherche à chaque fois que l'utilisateur tape une lettre. _L'input_ contient la méthode _performSearch_ qui permet de faire la recherche.

La méthode _performSearch_ utilise le **$emit** pour envoyer la query de recherche à la page d'accueil (App.vue).

#### **Home.vue**

Le composant Home.vue est la page d'accueil de l'application.

Elle contient le composant Filter qui permet de filtrer les produits.
Le composant a besoin d'un _@filter-selected_ qui permet de mettre à jour la query de recherche. 
On lui passe la méthode _updateSelectedFilter_ qui permet va récupérer la query de recherche et remplir la requête de l'API.

Elle contient également une boucle _v-for_ qui permet d'afficher tous les produits.
Les produits sont sous forme de cartes.
Le composant Card a besoin d'un tableau de produits pour pouvoir les afficher.
Si le tableau est vide, on affiche un message qui indique qu'il n'y a pas de produits.

Pour finir elle contient le composant Pagination qui permet de naviguer entre les pages.
On lui passe en attribut le nombre de pages et la page courante.
Le composant a besoin d'un _@page-click'_ qui permet de mettre à jour la page courante. Cet attribut est passé à la méthode _handlePaginationClick_ qui permet de faire une requête à l'API pour récupérer les produits de la page courante avec tous les filtres.

Dans mon script j'ai une props qui permet de récupérer la valeur de la query de recherche.
Il y a aussi un **watch** qui permet de mettre à jour la query de recherche à chaque fois qu'elle change.

J'ai une méthode dans le **computed** qui permet de récupérer les produits de l'API en fonction du filtre.
**Computed** permet de mettre en cache les données et de les mettre à jour uniquement si la query de recherche change.

**Monted** est une propriété qui permet d'exécuter une méthode au chargement de la page.
Dans celle ci j'appelle la fonction _fetchProducts_ qui permet de récupérer les produits de l'API.

#### **Filter.vue**

Le composant Filter.vue est le composant qui permet de filtrer les produits.

Le template contient un _v-for_ pour les couleurs et les tailles. Chacun d'entre eux contient une classe _active_ qui permet de mettre en surbrillance le filtre sélectionné.
Elles ont aussi un _@click_ qui permet de mettre à jour le filtre sélectionné. Les fonctions dans chacun des _@click_ sont les mêmes, elles appellent leurs méthodes respectives. Ces méthodes permettent de mettre à jour le filtre sélectionné et de mettre à jour la query des filtrs.

#### **Card.vue**

Le composant Card.vue est le composant qui permet d'afficher les produits.
Une card représente un produit.
Un produit contient une image, un nom, une couleur, une taille et un prix. Lorsqu'on clique sur une card, on est redirigé vers la page de détail du produit (DetailProduct.vue).
Cette page contient une méthode _detailProduct_ qui utilise le **$router** pour rediriger vers la page de détail du produit.

#### **Pagination.vue**

Le composant Pagination.vue est le composant qui permet de naviguer entre les pages.
Elle conitent un bouton pour la page précédente et un bouton pour la page suivante.
Nous pouvons naviguer entre les pages via le numéro de page.

Le composant fonctionne avec un _@click_ qui permet de mettre à jour la page courante. La méthode _goToPage_ permet de mettre à jour la page courante avec le **$emit**.

#### **DetailProduct.vue**

Le composant DetailProduct.vue est le composant qui permet d'afficher les détails d'un produit.
Elle contient une image, un nom, une couleur, une taille et un prix.
La route contient un paramètre qui permet de récupérer l'id du produit. Cet id est utilisé pour récupérer les détails du produit.

#### **Login.vue**

Le composant Login.vue est le composant qui permet de se connecter à l'application.
ELle contient un _v-form_ qui est un formulaire de connexion.
Il a un attribut _@submit_ qui permet de soumettre le formulaire.
Pour ce connecté il faut un email et un mot de passe.
Il y a une route API pour se connecter à l'application (**api/login_check**).
Cette route prend en paramètre un email et un mot de passe.
Une fois connecté, l'utilisateur est redirigé vers la page d'accueil.
Un token de connexion est stocké dans le store de l'application et permet de savoir si l'utilisateur est connecté ou non.


### Explication du router (Résumé)

#### **index.js**

Le fichier index.js contient le store de l'application.
Il contient les routes de l'application et les modules.
C'est lui qui gère le login de l'utilisateur.
Il va également stocker l'état de connexion de l'utilisateur.

### Explication du store (Résumé)

#### **api.js**

Le fichier api.js contient l'appel à l'API.
Il contient une méthode _fetchProducts_ qui permet de récupérer les produits de l'API.
Elle contient également une méthode _fetchProductById_ qui prend en paramètre l'id du produit et qui permet de récupérer les détails du produit.

#### **counter.js**

Le fichier counter.js contient le module counter.
Il contient une fonction _increment_ qui permet d'incrémenter le compteur. (non utilisé)

### Explication des styles (Résumé)

Style qui est utilisé dans toute l'application.
Le style spécifique a un composant est dans le dossier du composant.
