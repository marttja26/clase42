import ProductsDaoFactory from "../daos/Products/ProductsDaoFactory.js";

export default class ProductsRepo {
    dao

    constructor() {
        this.dao = ProductsDaoFactory.getDao()
    }

    async getAll() {
        const products = await this.dao.getAll()
        return products
    }

    async getWithParams(params, sort) {
        const products = await this.dao.getWithParams(params, sort)
        return products
    }

    async getQueries() {
        const queries = await this.dao.getQueries()
        return queries
    }

    async get(id) {
        const product = await this.dao.get(id)
        return product
    }

    async saveOne(obj) {
        const res = await this.dao.saveOne(obj)
        return res
    }

    async update(obj, id){
        const res = await this.dao.update(obj, id)
        return res
    }

    async delete(id) {
        const res = this.dao.delete(id)
        return res
    }
}