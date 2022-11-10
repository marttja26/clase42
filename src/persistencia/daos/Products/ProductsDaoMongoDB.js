import ContainerMongoDB from '../../containers/ContainerMongoDB.js';
import { ProductsModel } from '../../models/Products.js';
import logger from '../../../logger/logger.js';

let instance;
class ProductsDaoMongoDb extends ContainerMongoDB {
	constructor() {
		super(ProductsModel);
	}
	async getWithParams(params, sort) {
		if (sort !== undefined) {
			try {
				const docs = await ProductsModel.find({ ...params }).sort({
					price: sort,
				});
				return {
					status: 'Success',
					message: 'Se obtuvieron correctamente los documentos',
					docs,
				};
			} catch (error) {
				logger.error({ message: `error al obtener los productos ${error}` });
				return { status: 'Error', message: 'Error al obtener los documentos' };
			}
		} else {
			try {
				const docs = await ProductsModel.find({ ...params });
				return {
					status: 'Success',
					message: 'Se obtuvieron correctamente los documentos',
					docs,
				};
			} catch (error) {
				logger.error({ message: `error al obtener los productos ${error}` });
				return { status: 'Error', message: 'Error al obtener los documentos' };
			}
		}
	}

	async getQueries() {
		try {
			const queries = await ProductsModel.aggregate([
				{
					$project: {
						_id: 0,
						brand: 1,
						category: 1,
					},
				},
			]);
			return {
				status: 'Success',
				message: 'Se obtuvieron correctamente las queries',
				queries,
			};
		} catch (error) {
			logger.error({ message: `error al obtener las queries ${error}` });
			return { status: 'Error', message: 'Error al obtener las queries' };
		}
	}

	static getInstance() {
		if (!instance) {
			instance = new ProductsDaoMongoDb();
		}
		return instance;
	}
}

export default ProductsDaoMongoDb;
