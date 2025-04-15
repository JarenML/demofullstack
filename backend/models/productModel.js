const db = require('../config/db')

class ProductModel{
    async getAllProducts(){
        const result = await db.query('SELECT * FROM producto');
        return result.rows;
    }

    // funciona para obtener un registro por su ID
    async getProduct(id){
        const result = await db.query('SELECT * FROM producto WHERE id = $1', [1]);
        return result.rows[0];
        // Retorna el primer producto 
    }

    async createProduct({nombre, precio, descripcion}){
        const result = await db.query(
            'INSERT INTO producto (nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING *',
            [nombre, precio, descripcion]
        );

        return result.rows[0]
    }

    async updateProduct(id, {nombre, precio, descripcion}){
        const result = await db.query(
            `UPDATE producto SET nombre = $1, precio = $2, 
            descripcion = $3 WHERE id = $4 WHERE id = $4 RETURNING *`,
            [nombre, precio, descripcion]
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