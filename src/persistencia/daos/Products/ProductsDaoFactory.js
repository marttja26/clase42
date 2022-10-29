import ProductsDaoMongoDb from "./ProductsDaoMongoDB.js";
import ProductsDaoMem from "./ProductsDaoMem.js";

const option = "mongo" // process.argv[2]

let dao 

switch(option) {
    case 'mongo': 
    dao = ProductsDaoMongoDb.getInstance()
    break
    default:
    dao = ProductsDaoMem.getInstance()
}

export default class ProductsDaoFactory {
    static getDao() {
        return dao
    }
}