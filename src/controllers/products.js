import logger from '../logger/logger.js';
import products from '../negocio/products.js';

const getProductsController = async (req, res) => {
	const { method, url, query } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	const apiresponse = await products.getProducts(query)
	if (apiresponse.status === 'Success') {
		res.status(200).json(apiresponse.docs)
	}	else {
		res.status(404).json(apiresponse.message)
	}
};

const saveProductController = async (req, res) => {
	const { method, url, body } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	const apiresponse = await products.saveProduct(body);
	if (apiresponse.status === 'Success') {
		res.status(200).json(apiresponse.message)
	}	else {
		res.status(404).json(apiresponse.message)
	}
};

const updateProductsController = async (req, res) => {
	const { method, url, body } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	const apiresponse = await products.updateProducts(body);
	if (apiresponse.status === 'Success') {
		res.status(200).json(apiresponse.message)
	}	else {
		res.status(404).json(apiresponse.message)
	}
};

const deleteProductsController = async (req, res) => {
	const { method, url, body } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);

	const apiresponse = await products.deleteProducts(body);
	if (apiresponse.status === 'Success') {
		res.status(200).json(apiresponse.message)
	}	else {
		res.status(404).json(apiresponse.message)
	}
};

const getProductsQueriesController = async (req, res) => {
	const { method, url } = req;
	logger.info(` Peticion a ${method} ${url} recibida`);
	const apiresponse = await products.getProductsQueries();
	if (apiresponse.status === 'Success') {
		res.status(200).json(apiresponse.queries)
	}	else {
		res.status(404).json(apiresponse.message)
	}
};

export default {
	getProductsController,
	saveProductController,
	updateProductsController,
	deleteProductsController,
	getProductsQueriesController,
};
