import { insertProductDTI } from "../model/products/Products.interface";
import { ProductModel } from "../model/products/Products.model";
import BaseDataBase from "./BaseDatabase";
import { productsTableName } from "./TableNames";

export class ProductDatabase extends BaseDataBase {
    protected tableName: string = productsTableName;
    
    async insert(product: insertProductDTI): Promise<void> {
        try {
            await BaseDataBase.connection(this.tableName)
            .insert(product);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async update(product: ProductModel): Promise<boolean> {
        try {
            await BaseDataBase.connection(this.tableName)
                .update(ProductModel.toProductDTI(product))
                .where("id", product.getId());
            return true
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await BaseDataBase.connection.raw(`
                DELETE FROM ${this.tableName} WHERE id = "${id}"
            `);
            return true
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async findById(id: string): Promise<ProductModel|undefined>{
        try {
            const result = await BaseDataBase.connection.raw(`
                SELECT * FROM ${this.tableName} WHERE id = "${id}"
            `)
            
            const product = result[0][0];
            if(product){
                const result1 = ProductModel.toProductModel(product);
                return result1
            } else {
                return undefined
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getAll(): Promise<ProductModel[]> {
        try {
           
           const result = await BaseDataBase.connection.raw(`
                 SELECT * from ${this.tableName}
              `);
  
           return result[0].map((res: any) => {
              return ProductModel.toProductModel(res);
           });
           } catch (error) {
           throw new Error(error.sqlMessage || error.message);
           }
     }
}