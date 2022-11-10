import ProductsRepo from '../persistencia/repository/ProductsRepo.js';
const productApi = new ProductsRepo();

const getProducts = async (query) => {
	const { order, ...remQuerys } = query;
	let filterParams = {};
	Object.keys(remQuerys).forEach((key) => {
		let optionArray = remQuerys[key].split(',');
		let filter = { [key]: { $in: optionArray } };
		filterParams = { ...filterParams, ...filter };
	});
	switch (query.order) {
		case 'OrderByPriceASC':
			return await productApi.getWithParams(filterParams, 1);
		case 'OrderByPriceDESC':
			return await productApi.getWithParams(filterParams, -1);
		default:
			return await productApi.getWithParams(filterParams);
	}
};

const saveProduct = async (body) => {
	try {
		return await productApi.saveOne(body);
	} catch (error) {
		logger.error({ message: `error al guardar un producto ${error}` });
	}
};

const updateProducts = async (body) => {
	try {
		return await productApi.update(body, body._id);
	} catch (error) {
		logger.error({ message: `error al editar un producto ${error}` });
	}
};

const deleteProducts = async (body) => {
	try {
		return await productApi.delete(body._id);
	} catch (error) {
		logger.error({ message: `error al borrar un producto ${error}` });
	}
};

const getProductsQueries = async () => {
	const res = await productApi.getQueries();

	if (res.status === 'Success') {
		const resCopy = { ...res };
		const existingQuerys = { brand: [], category: [] };

		res.queries.forEach((element) => {
			if (!existingQuerys.brand.includes(element.brand)) {
				existingQuerys.brand.push(element.brand);
			}
			if (!existingQuerys.category.includes(element.category)) {
				existingQuerys.category.push(element.category);
			}
		});

		resCopy.queries = existingQuerys;
		return resCopy;
	} else {
		return res;
	}
};

export default {
	getProducts,
	saveProduct,
	updateProducts,
	deleteProducts,
	getProductsQueries,
};
