import express from "express";
import { ProductsController } from "../controller/products/Products.Controller";

export const productRouter = express.Router();
const productsController = new ProductsController();


productRouter.post("/", productsController.insert);
productRouter.put("/:id", productsController.update);
productRouter.delete("/:id", productsController.delete);
productRouter.get("/:id", productsController.find);
productRouter.get("/getAll", productsController.getAll);
