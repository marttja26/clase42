export default class OrderDto {
    constructor({_id, buyer, cart, totalPrice}) {
        this._id = _id
        this.buyer = buyer
        this.cart = cart
        this.totalPrice = totalPrice
    }
}

export const asDto = (order) => {
    if(Array.isArray(order))
        return order.map(o => new ProductDto(o))
    else
        return new OrderDto(order)
}