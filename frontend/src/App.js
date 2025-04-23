// src/App.js
import React, { useState, useEffect } from "react";
import { getProductById, createProduct, updateProduct, getProducts, deleteProduct } from "./services/productService";

import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto que se ejecuta al cargar el componente para obtener los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos", error);
        setError("Hubo un error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); // Llamamos a la función fetchProducts
  }, []);

  // Función que maneja el agregado de un nuevo producto
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Función que maneja la actualización de un producto
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Función que maneja la eliminación de un producto
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      setError("Hubo un error al eliminar el producto.");
    }
  };

  // Función que maneja la edición de un producto
  const handleEditProduct = (id) => {
    setProductIdToEdit(id);
  };

  return (
    <div className="App">
      <h1>Gestión de Productos</h1>
      {/* Si estamos cargando, mostramos un mensaje de carga */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <div className="error">{error}</div> 
      ) : (
        <>
          {/* Componente de formulario para agregar o editar un producto */}
          <ProductForm
            productId={productIdToEdit}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
          />
          {/* Componente de lista para mostrar los productos */}
          <ProductList
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onEditProduct={handleEditProduct}
          />
        </>
      )}
    </div>
  );
}

export default App;