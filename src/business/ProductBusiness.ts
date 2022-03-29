import { ProductDatabase } from "../data/ProductDatabase";
import { insertProductDTO } from "../model/Products";
import { IdGenerator } from "../services/idGenerator";
import { TokenGenerator } from "../services/tokenGenerator";

export class ProductBusiness {
    constructor(
        private idGenerator : IdGenerator,
        private tokenGenerator: TokenGenerator,
        private database: ProductDatabase
    ) {

    }
    async insert(product: insertProductDTO) {
        try {
            
        } catch (error) {
            
        }
    }
}