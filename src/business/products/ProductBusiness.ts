import { ProductDatabase } from "../../data/ProductDatabase";
import { CustomError } from "../../errors/CustomError";
import { insertProductDTO, insertProductDTI } from "../../model/products/Products.interface";
import { ProductModel } from "../../model/products/Products.model";
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
    insert = async (product: insertProductDTO, token: string): Promise<ProductModel> => {
        try {
            
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized");
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            
            if((!product.description)||
                (!product.SKU)||
                (!product.unit)||
                (isNaN(Number(product.price)))||
                (isNaN(Number(product.qty_Min)))||
                (isNaN(Number(product.qty_Max)))){
                    throw new CustomError(412, "Fields requered or falue!");
            }
            const id = this.idGenerator.generate();
            
            const newProduct: insertProductDTI = {
                id: id,
                description: product.description,
                SKU: product.SKU,
                unit: product.unit,
                price: product.price,
                qty_Min: product.qty_Min,
                qty_Max: product.qty_Max,
                status: 0, 
                date_Status: new Date(), 
                id_User: tokenValidation.id, 
                date_Create: new Date(),
                date_Update: new Date()
            };
            await this.database.insert(newProduct);
            return ProductModel.toProductModel(newProduct);
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    update = async (product: ProductModel, token: string): Promise<boolean> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized");
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
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
            
            exist.setDescription(product.getDescription());
            exist.setSKU(product.getSKU());
            exist.setUnit(product.getUnit());
            exist.setPrice(product.getPrice());
            exist.setQty_Min(product.getQty_Min());
            exist.setQty_Max(product.getQty_Max());
            exist.setId_User(tokenValidation.id);
            exist.setDate_Update(new Date());
            
            if(await this.database.update(exist)){
                return true
            } else {
                return false
            };
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    delete = async (id:string, token: string): Promise<boolean> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized");
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            const exist = await this.database.findById(id);
            
            if(!exist){
                throw new CustomError(404, "'id' not found!");
            }
            if(await this.database.delete(id)) {
                return true
            } else {
                return false
            };
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    findById = async (id:string, token: string): Promise<ProductModel> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized");
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            const exist = await this.database.findById(id);
            
            if(!exist){
                throw new CustomError(404, "'id' not found!");
            }
            return exist
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    getAll = async (token: string): Promise<ProductModel[]> => {
        try {
            
            // const tokenValidation = this.tokenGenerator.verify(token);
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized");
            }
            const result = await this.database.getAll();
            return result
        } catch (error) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    
}