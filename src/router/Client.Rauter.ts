import express from "express";
import { ClientsController } from "../controller/clients/ClientsController";

export const ClientRouter = express.Router();
const clientsController = new ClientsController();

ClientRouter.post("/insert", clientsController.insert)
