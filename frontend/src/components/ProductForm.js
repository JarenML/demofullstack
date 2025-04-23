import React, { useState, useEffect } from "react";
import { getProductById, createProduct, updateProduct } from "../services/productService";


const ProductForm = ({ productId, onAddProduct, onUpdateProduct }) => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [fecha_compra, setFechaCompra] = useState("");
    const [cliente_id, setClienteId] = useState("");
    const [error, setError] = useState(null);

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario

        // Validación para asegurarse de que todos los campos estén completos
        if (!nombre || !precio || !descripcion || !cantidad || !fecha_compra || !cliente_id) {
            setError("Todos los campos son obligatorios."); // Mostramos un mensaje de error si falta algún campo
            return;
        }

        const product = {
            nombre,
            precio: parseFloat(precio),
            descripcion,
            cantidad: parseInt(cantidad),
            fecha_compra,
            cliente_id: parseInt(cliente_id)
        };// Creamos el objeto del producto con los datos del formulario

        try {
            // Si estamos editando un producto, hacemos una solicitud PUT para actualizar
            if (productId) {
                const response = await updateProduct(productId, product); // Llamada al servicio para actualizar el producto
                onUpdateProduct(response.data); // Llamamos al callback onUpdateProduct para actualizar el producto en la lista
            } else {
                // Si estamos creando un nuevo producto, hacemos una solicitud POST para agregarlo
                const response = await createProduct(product); // Llamada al servicio para crear el producto
                onAddProduct(response.data); // Llamamos al callback onAddProduct para agregar el nuevo producto a la lista
            }
            setError(null); // Limpiamos el error después de un envío exitoso

            // Limpiamos los campos del formulario después de agregar o actualizar
            setNombre("");
            setPrecio("");
            setDescripcion("");
        } catch (error) {
            console.error("Error al procesar el producto", error);
            setError("Hubo un error al procesar el producto."); // Mostramos un mensaje de error si algo sale mal
        }
    };

    // Efecto que se ejecuta cuando cambia el productId
    useEffect(() => {
        const fetchProduct = async () => {
            // Si productId existe, estamos editando un producto, así que lo cargamos
            if (productId) {
                try {
                    const response = await getProductById(productId); // Llamada al servicio para obtener el producto
                    const product = response.data;
                    setNombre(product.nombre); // Establecemos los valores del producto en los estados
                    setPrecio(product.precio);
                    setDescripcion(product.descripcion);
                    setCantidad(product.cantidad);
                    setPrecio(product.precio);
                    setFechaCompra(product.fecha_compra);
                    setClienteId(product.cliente_id);
                } catch (error) {
                    console.error("Error al obtener el producto para editar", error);
                    setError("Error al obtener los datos del producto."); // Mostramos un mensaje de error
                }
            } else {
                // Si no hay productId, estamos creando un nuevo producto, así que restablecemos los campos
                setNombre("");
                setPrecio("");
                setDescripcion("");
                setCantidad(0);
                setPrecio(0);
                setFechaCompra("");
                setClienteId("")
            }
        };

        fetchProduct(); // Ejecutamos la función fetchProduct
    }, [productId]); // Dependencia en productId para que se ejecute cada vez que cambie

    return (
        <form onSubmit={handleSubmit}>
            <h2>{productId ? "Editar Producto" : "Crear Producto"}</h2>
            {error && <div className="error">{error}</div>}

            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label>Precio</label>
                <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
            </div>
            <div>
                <label>Descripción</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
            </div>
            <div>
                <label>Cantidad</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
            </div>
            <div>
                <label>Fecha de compra</label>
                <input
                    type="datetime-local"
                    value={fecha_compra.slice(0, 16)} // para compatibilidad con el input
                    onChange={(e) => setFechaCompra(e.target.value)}
                />
            </div>
            <div>
                <label>ID del Cliente</label>
                <input
                    type="number"
                    value={cliente_id}
                    onChange={(e) => setClienteId(e.target.value)}
                />
            </div>

            <button type="submit">
                {productId ? "Actualizar Producto" : "Guardar Producto"}
            </button>
        </form>
    );
};


export default ProductForm;