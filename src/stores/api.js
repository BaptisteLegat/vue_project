import axios from 'axios';

export function fetchProducts() {
  return axios.get('https://sf-clothes-api.ld-web.net/api/products')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function fetchProductById(id) {
    return axios.get(`https://sf-clothes-api.ld-web.net/api/products/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}