import axios from 'axios';

export async function fetchProducts(apiUrl) {
  try {
    const response = await axios.get(`https://sf-clothes-api.ld-web.net${apiUrl}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchProductById(id) {
    try {
    const response = await axios.get(`https://sf-clothes-api.ld-web.net/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}