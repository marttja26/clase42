import logger from '../../logger/logger.js';
import mongoose from 'mongoose';

class ContainerMongoDB {
	constructor(model) {
		this.model = model;
	}

	async getAll() {
		try {
			const docs = await this.model.find({});
			return {
				status: 'Success',
				message: 'Se obtuvieron correctamente los documentos',
				docs,
			};
		} catch (error) {
			logger.error({ message: `error al obtener los documentos ${error}` });
			return {
				status: 'Error',
				message: 'No se pudieron obtener los documentos',
			};
		}
	}

	async get(id) {
		const validId = mongoose.Types.ObjectId.isValid(id);
		if (validId) {
			try {
				const doc = await this.model.findById(id);
				return {
					status: 'Success',
					message: 'Se obtuvo correctamente el documento',
					doc,
				};
			} catch (error) {
				logger.error({ message: `error al obtener el documento ${error}` });
				return { status: 'Error', message: 'No se pudo obtener el documento' };
			}
		} else {
			logger.error({
				message: `error al obtener el documento, no se encontro el id: ${id}`,
			});
			return {
				status: 'Error',
				message: `No se pudo obtener el documento con el id: ${id}`,
			};
		}
	}

	async saveOne(obj) {
		try {
			const doc = await this.model.collection.insertOne(obj);
			console.log(typeof this.model)
			return {
				status: 'Success',
				message: `El producto con el id ${doc.insertedId} se agrego correctamente.`,
			};
		} catch (error) {
			logger.error({ message: `error al guardar el documento ${error}` });
			return { status: 'Error', message: `Error al guardar el documento.` };
		}
	}

	async update(objeto, id) {
		const validId = mongoose.Types.ObjectId.isValid(id);
		let objectExist;
		if (validId) {
			objectExist = await this.model.findById(id);
		}
		if (objectExist) {
			try {
				await this.model.findByIdAndUpdate(id, objeto);
				return {
					status: 'Success',
					message: `El documento con el id ${id} se edito correctamente.`,
				};
			} catch (error) {
				logger.error({ message: `error al actualizar el documento ${error}` });
				return {
					status: 'Error',
					message: `Error al actualizar el documento.`,
				};
			}
		} else {
			logger.error({
				message: `error al actualizar el documento, no se encontro el id: ${id}`,
			});
			return {
				status: 'Error',
				message: `error al actualizar el documento, no se encontro el id: ${id}`,
			};
		}
	}

	async delete(id) {
		const validId = mongoose.Types.ObjectId.isValid(id);
		let objectExist;
		if (validId) {
			objectExist = await this.model.findById(id);
		}
		if (objectExist) {
			try {
				await this.model.findByIdAndDelete(id);
				return {
					status: 'Success',
					message: `El documento con el id ${id} se elimino correctamente.`,
				};
			} catch (error) {
				logger.error({ message: `error al borrar el documento ${error}` });
				return {
					status: 'Error',
					message: `Error al borrar el documento.`,
				};
			}
		} else {
			logger.error({
				message: `error al borrar el documento, no se encontro el id: ${id}`,
			});
			return {
				status: 'Error',
				message: `error al borrar el documento, no se encontro el id: ${id}`,
			};
		}
	}
}

export default ContainerMongoDB;
