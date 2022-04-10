import { ProductModel } from "../../model/products/Products.model";
import { insertProductDTO } from "../../model/products/Products.interface"

export interface IProductsBusiness {
    insert(product: insertProductDTO, token: string): Promise<ProductModel>;
    update(id: string, product: insertProductDTO, token: String): Promise<boolean>;
    delete(id:string, token: string): Promise<boolean>;
    findById(id:string, token: string): Promise<ProductModel>;
    getAll(token: string): Promise<ProductModel[]>;
}

export interface iProductsMetodos {
    insert(): iProductsMetodosInsert;
    // update(product: Product): iProductsMetodosUpdate;
}
export interface iProductsMetodosInsert {
    product(value: insertProductDTO): iProductsMetodosInsert;
    token(value: string): iProductsMetodosInsert;
    end():iProductsMetodos;
}