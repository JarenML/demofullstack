const db = require('../config/db')

class ProductModel{
    async getAllProducts(){
        const result = await db.query('SELECT * FROM producto');
        return result.rows;
    }

    // funciona para obtener un registro por su ID
    async getProduct(id){
        const result = await db.query('SELECT * FROM producto WHERE id = $1', [id]);
        return result.rows[0];
        // Retorna el primer producto 
    }

    async createProduct({nombre, precio, descripcion, cantidad, fecha_compra, cliente_id}){
        const result = await db.query(
            'INSERT INTO producto (nombre, precio, descripcion, cantidad, fecha_compra, cliente_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [nombre, precio, descripcion, cantidad, fecha_compra, cliente_id]
        );

        return result.rows[0];
    }

    async updateProduct(id, {nombre, precio, descripcion, cantidad, fecha_compra}){
        const result = await db.query(
            `UPDATE producto SET nombre = $1, precio = $2, 
            descripcion = $3, cantidad = $4, fecha_compra = $5 WHERE id = $6 RETURNING *`,
            [nombre, precio, descripcion, cantidad, fecha_compra, id]
        );

        return result.rows[0];
    }

    async deleteProduct(id){
        await db.query(
            'DELETE FROM producto where id = $1',
            [id]
        );
    }

}

module.exports = new ProductModel();