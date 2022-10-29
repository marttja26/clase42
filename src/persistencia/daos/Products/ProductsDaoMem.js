import ContainerMem from '../../containers/ContainerMem.js';
import { ProductsModel } from '../../models/Products.js';
import logger from '../../../logger/logger.js';


let instance
class ProductsDaoMem extends ContainerMem {
	constructor() {
		super(ProductsModel);
	}
	async getWithParams(params, sort) {
		if (sort !== undefined) {
			try {
				return await ProductsModel.find({ ...params }).sort({ price: sort });
			} catch (error) {
				logger.error({ message: `error al obtener los productos ${error}` });
			}
		} else {
			try {
				return await ProductsModel.find({ ...params });
			} catch (error) {
				logger.error({ message: `error al obtener los productos ${error}` });
			}
		}
	}

	async getQueries() {
		try {
			return await ProductsModel.aggregate([
				{
					$project: {
						_id: 0,
						brand: 1,
						category: 1,
					},
				},
			]);
		} catch (error) {
			logger.error({ message: `error al obtener las queries ${error}` });
		}
	}

	static getInstance() {
		if(!instance) {
			instance = new ProductsDaoMem()
		}
		return instance
	}
}

export default ProductsDaoMem;
