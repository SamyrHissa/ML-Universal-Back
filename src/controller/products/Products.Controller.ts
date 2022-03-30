import { Request, Response } from "express";
import { ProductBusiness } from "../../business/products/ProductBusiness";
import { ProductDatabase } from "../../data/ProductDatabase";
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
}