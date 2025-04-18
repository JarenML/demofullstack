const productService = require('../services/productService');
const errorsList = require('../errors')


function handleError(res, type='Unknown'){
    const err = errorsList[type] || errorsList.Unknown;
    return res.status(err.status).json({code: err.code, message: err.message});
}

class ProductController {
    async getProducts(req, res){
        try {
            const products = await productService.getProducts();
            res.json(products);
        }catch (error) {
            console.error(error);
            handleError(res, 'DatabaseError');
        }
    }

    async getProductById(req, res){
        const { id } = req.params;

        try{
            const product = await productService.getProductById(id);

            if(!product){
                return handleError(res, 'NotFound')
            }
            res.json(product);
        }catch(error){
            console.error(error);
            handleError(res, 'DatabaseError')
        }
    }

    async createProduct(req, res) {
        try{
            const {nombre, precio, descripcion, cantidad, fecha_compra, cliente_id} = req.body;
            const newProduct = await productService.addProduct({nombre, precio, descripcion, cantidad, fecha_compra, cliente_id});
            res.status(201).json(newProduct);
        }catch (error){
            console.error(error);
            handleError(res, 'Validation');
        }
    }

    async updateProduct(req, res) {
        try{
            const { id } = req.params;
            const {nombre, precio, descripcion, cantidad, fecha_compra} = req.body;
            const updatedProduct = await productService.modifyProduct(id, {nombre, precio, descripcion, cantidad, fecha_compra});
            res.json(updatedProduct);
        }catch (error) {
            console.error(error);
            handleError(res, 'DatabaseError');
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);
        }catch (error) {
            console.error(error);
            handleError(res, 'DatabaseError');
        }

    }
}

module.exports = new ProductController();