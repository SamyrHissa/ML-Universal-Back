import { Product } from "../model/Products";
import BaseDataBase from "./BaseDatabase";
import { productsTableName } from "./TableNames";

export class ProductDatabase extends BaseDataBase {
    protected tableName: string = productsTableName;

     async insert(product: Product): Promise<void> {
         try {
            const new1Product = {
                "id": product.getId(),
                "description": product.getDescription(),
                "SKU": product.getSKU(),
                "Unit": product.getUnit(),
                "Price": product.getPrice(),
                "Qty_Min": product.getQty_Min(),
                "Qty_Max": product.getQty_Max()
            }
             await BaseDataBase.connection(this.tableName)
                .insert(new1Product);
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