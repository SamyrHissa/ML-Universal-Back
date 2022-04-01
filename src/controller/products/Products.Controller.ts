import { Request, Response } from "express";
import { ProductBusiness } from "../../business/products/ProductBusiness";
import { ProductDatabase } from "../../data/ProductDatabase";
import { Product } from "../../model/Products";
import { IdGenerator } from "../../services/idGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";

export class ProductsController {
    private productsBusiness : ProductBusiness;
    constructor(
        
    ){
        this.productsBusiness = new ProductBusiness(
            new IdGenerator(),
            new TokenGenerator(),
            new ProductDatabase()
        )
    }
    insert = async (req: Request, res: Response) => {
        try {
            const {description, sku, unit, price, qty_min, qty_max} = req.body;
            const token: string = String(req.headers.authorization);
            const result = await this.productsBusiness.insert({
                description: description,
                SKU: sku,
                unit: unit,
                price: price,
                qty_Min: qty_min,
                qty_Max: qty_max
            }, token)
            res.status(200).send(result);
        } catch (error) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });
        }
    }
    update =async (req: Request, res: Response) => {
        try {
            const {id, description, sku, unit, price, qty_min, qty_max} = req.body;
            const token: string = String(req.headers.authorization);
            const newProduct = new Product(
                id,
                description,
                sku,
                unit,
                price,
                qty_min,
                qty_max
            )
            if(await this.productsBusiness.update(newProduct , token)){
                res.status(200).send("Data Updated!")
            } else {
                res.status(412).send("Data not Updated!")
            }
            
            
        } catch (error) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const id: string = req.params.id;
            const token: string = String(req.headers.authorization);
            if(await this.productsBusiness.delete(id, token)){
                res.status(200).send("Product deleted!")
            } else {
                res.status(412).send("Product not deleted!")
            }
        } catch (error) {
            const { statusCode, message } = error;
            res.status(statusCode || 400).send({ message });
        }
    }
}