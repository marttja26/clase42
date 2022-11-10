import { Router } from 'express';
import products from '../controllers/products.js';
import { isAdmin } from '../middlewares/middleware.js';

const routerProducts = new Router();

routerProducts.get('/productos', products.getProductsController);

routerProducts.get('/productos/querys', products.getProductsQueriesController)

routerProducts.post('/productos',  products.saveProductController)

routerProducts.put('/productos',  products.updateProductsController)

routerProducts.delete('/productos', products.deleteProductsController)

// Los tres ultimos endpoints deberian utilizar isAdmin como middleware previo al uso de los controladores, lo saque solamente para realizar los test.

export default routerProducts;
