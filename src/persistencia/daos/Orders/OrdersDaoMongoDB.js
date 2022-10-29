import ContainerMongoDB from "../../containers/ContainerMongoDB.js";
import {OrdersModel} from "../../models/Orders.js"

let instance

class OrdersDaoMongoDb extends ContainerMongoDB {
	constructor() {
		super(OrdersModel);
	}

	static getInstance() {
		if(!instance) {
			instance = new OrdersDaoMongoDb()
		}
		return instance
	}
}

export default OrdersDaoMongoDb;