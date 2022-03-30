import { ProductDatabase } from "../../data/ProductDatabase";
import { CustomError } from "../../errors/CustomError";
import { insertProductDTO, Product } from "../../model/Products";
import { IdGenerator } from "../../services/idGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";
import { IProductsBusiness } from "./Products.Business.Iterface";

export class ProductBusiness implements IProductsBusiness {
    constructor(
        private idGenerator : IdGenerator,
        private tokenGenerator: TokenGenerator,
        private database: ProductDatabase
    ) {

    }
    insert = async (product: insertProductDTO, token: string): Promise<Product> => {
        try {
            const tokenValidation = this.tokenGenerator.verify(token);
            if(!tokenValidation || (tokenValidation.role !== "ADMIN")){
                throw new CustomError(422, "Token Unauthorized");
            }
            const id = this.idGenerator.generate();
            const new1Product = {
                "id":id,
                "description": product.description,
                "SKU": product.SKU,
                "unit": product.unit,
                "price": product.price,
                "Qty_Min": product.qty_Min,
                "Qty_Max": product.qty_Max
            }
            const newProduct2 = Product.toProductModel(new1Product)
            const newProduct = new Product(id,
                product.description,
                product.SKU,
                product.unit,
                product.price,
                product.qty_Min,
                product.qty_Max);
            await this.database.insert(newProduct)
            return newProduct
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    update = async (product: Product, token: string): Promise<boolean> => {
        return true
    }
    
}