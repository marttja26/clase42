import ContainerMem from "../../containers/ContainerMem.js"
import { OrdersModel } from "../../models/Orders.js";

let instance

class OrdersDaoMem extends ContainerMem {
	constructor() {
		super(OrdersModel);
	}

	static getInstance() {
		if(!instance) {
			instance = new OrdersDaoMem()
		}
		return instance
	}
}

export default OrdersDaoMem;