import axios from 'axios';

export function fetchProducts() {
  return axios.get('https://fakestoreapi.com/products')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}