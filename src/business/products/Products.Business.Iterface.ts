import { insertProductDTO, Product } from "../../model/Products";

export interface IProductsBusiness {
    insert(product: insertProductDTO, token: string): Promise<Product>;
    update(product: Product, token: String): Promise<boolean>;
    delete(id:string, token: string): Promise<boolean>;
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