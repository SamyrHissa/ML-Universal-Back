import express from "express";
import { ProductsController } from "../controller/products/Products.Controller";

export const productRouter = express.Router();
const productsController = new ProductsController();

productRouter.post("/insert", productsController.insert);
productRouter.post("/update", productsController.update);