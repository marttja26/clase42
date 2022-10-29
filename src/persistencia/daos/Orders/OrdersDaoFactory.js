import OrdersDaoMongoDb from "./OrdersDaoMongoDB.js";
import OrdersDaoMem from "./OrdersDaoMem.js";

const option = "mongo" // process.argv[2]

let dao 

switch(option) {
    case 'mongo': 
    dao = OrdersDaoMongoDb.getInstance()
    break
    default:
    dao = OrdersDaoMem.getInstance()
}

export default class OrdersDaoFactory {
    static getDao() {
        return dao
    }
}