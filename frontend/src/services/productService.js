import axios from 'axios';

const API_URL = "http://localhost:3000/productos";

// Obtener todos los productos
export const getProducts = () => axios.get(API_URL);

// Obtener un producto por ID
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);

// Crear un nuevo producto
export const createProduct = (product) => axios.post(API_URL, product);

// Actualizar un producto
export const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);

// Eliminar un producto
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
