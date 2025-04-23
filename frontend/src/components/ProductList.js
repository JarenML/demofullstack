// src/components/ProductList.js
import React from "react";

// Componente que muestra la lista de productos
const ProductList = ({ products, onDeleteProduct, onEditProduct }) => {
  // Función que maneja la confirmación de eliminación
  const handleDeleteConfirmation = (id) => {
    // Usamos la ventana de confirmación del navegador antes de eliminar
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      onDeleteProduct(id); // Llamamos a la función onDeleteProduct para eliminar el producto
    }
  };

  return (
    <div>
      <h2 className="products-title">Lista de Productos</h2>
      {/* Si no hay productos, mostramos un mensaje indicando que no hay productos */}
      {products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        // Si hay productos, los mostramos en una lista
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <strong>{product.nombre}</strong> - ${product.precio}
              <p>{product.descripcion}</p>
              <div className="product-actions">
                {/* Botón para editar el producto */}
                <button
                  className="edit-button"
                  onClick={() => onEditProduct(product.id)} // Llamamos a la función onEditProduct cuando se hace clic
                >
                  Editar
                </button>
                {/* Botón para eliminar el producto */}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteConfirmation(product.id)} // Confirmamos antes de eliminar
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;