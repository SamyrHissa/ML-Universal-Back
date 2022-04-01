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
                throw new CustomError(401, "Token Unauthorized");
            }
            
            if((!product.description)||
                (!product.SKU)||
                (!product.unit)||
                (!isNaN(Number(product.price)))||
                (!isNaN(Number(product.qty_Min)))||
                (!isNaN(Number(product.qty_Max)))){
                    throw new CustomError(412, "Fields requered or falue!");
            }
            const id = this.idGenerator.generate();
            
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
        try {
            const tokenValidation = this.tokenGenerator.verify(token);
            if(!tokenValidation || (tokenValidation.role !== "ADMIN")){
                throw new CustomError(401, "Token Unauthorized");
            }
            
            if((!product.getId())||
                (!product.getDescription())||
                (!product.getSKU())||
                (!product.getUnit())||
                (isNaN(Number(product.getPrice())))||
                (isNaN(Number(product.getQty_Min())))||
                (isNaN(Number(product.getQty_Max())))){
                    throw new CustomError(412, "Fields requered or falue!");
            }
            const exist = await this.database.findById(product.getId());
            
            if(!exist){
                throw new CustomError(404, "'id' not found!");
            }
            await this.database.update(product);
            return true
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    delete = async (id:string, token: string): Promise<boolean> => {
        try {
            const tokenValidation = this.tokenGenerator.verify(token);
            if(!tokenValidation || (tokenValidation.role !== "ADMIN")){
                throw new CustomError(401, "Token Unauthorized");
            }
            const exist = await this.database.findById(id);
            
            if(!exist){
                throw new CustomError(404, "'id' not found!");
            }
            await this.database.delete(id);
            return true
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    
}