import ProductsDaoFactory from '../persistencia/daos/Products/ProductsDaoFactory.js';
import ProductsRepo from '../persistencia/repository/ProductsRepo.js';
const productApi = new ProductsRepo()

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
			return await productApi.getWithParams(filterParams, 1)
		case 'OrderByPriceDESC':
			return await productApi.getWithParams(filterParams, -1)
		default:
			return await productApi.getWithParams(filterParams)
	}
}

const getProductsQueries = async () => {
	const dbQuerys = await productApi.getQueries()
	
	const existingQuerys = { brand: [], category: [] };

	dbQuerys.forEach((element) => {
		if (!existingQuerys.brand.includes(element.brand)) {
			existingQuerys.brand.push(element.brand);
		}
		if (!existingQuerys.category.includes(element.category)) {
			existingQuerys.category.push(element.category);
		}
	});
	return existingQuerys
}

export default {
    getProducts,
	getProductsQueries
}