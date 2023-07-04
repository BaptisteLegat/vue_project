import axios from 'axios';
// ici on va créer une fonction qui va nous permettre de récupérer les produits
// async veut dire que la fonction est asynchrone
// await veut dire que la fonction attend que la requête soit terminée pour continuer
// on utilise axios pour faire des requêtes HTTP
// on utilise try catch pour gérer les erreurs
export async function fetchProducts(apiUrl) {
  try {
    const response = await axios.get(`https://sf-clothes-api.ld-web.net${apiUrl}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ici on va créer une fonction qui va nous permettre de récupérer un produit par son id
export async function fetchProductById(id) {
    try {
    const response = await axios.get(`https://sf-clothes-api.ld-web.net/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}