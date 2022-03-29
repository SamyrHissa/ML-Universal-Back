import { Product } from "../model/Products";
import BaseDataBase from "./BaseDatabase";
import { productsTableName } from "./TableNames";

export class ProductDatabase extends BaseDataBase {
    protected tableName: string = productsTableName;

    // private toModel(dbModel?: any): Product | undefined {
    //     return (
    //        dbModel &&
    //        new Product(
    //           dbModel.id,
    //           dbModel.description,
    //           dbModel.SKU,
    //           dbModel.unit,
    //           dbModel.price,
    //           dbModel.qty_Min,
    //           dbModel.qty_Max
    //        )
    //     );
    //  }
     async insert(product: Product): Promise<void> {
         try {
             await BaseDataBase.connection(this.tableName)
                .insert(product);
         } catch (error) {
             throw new Error(error.sqlMessage || error.message);
         }
     }
     async update(product: Product): Promise<boolean> {
         try {
             const result = await BaseDataBase.connection(this.tableName)
                .update(product)
            return true
         } catch (error) {
            throw new Error(error.sqlMessage || error.message);
         }
     }
}