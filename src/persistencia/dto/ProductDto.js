export default class ProductDto {
    constructor({_id, name, img, price, brand, description, category}) {
        this._id = _id
        this.name = name
        this.img = img
        this.price = price
        this.brand = brand
        this.description = description
        this.category = category
    }
}

export const asDto = (product) => {
    if(Array.isArray(product))
        return product.map(p => new ProductDto(p))
    else
        return new ProductDto(product)
}
