import { Request, Response } from "express";
import { ClientBusiness } from "../../business/clients/Client.Business";
import { ClientDatabase } from "../../data/ClientDatabase";
import { ClienteModel } from "../../model/clients/Client.Model";
import { IdGenerator } from "../../services/idGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";

export class ClientsController {
    private clientsBusiness : ClientBusiness;
    constructor(

    ){
        this.clientsBusiness = new ClientBusiness(
            new IdGenerator,
            new TokenGenerator,
            new ClientDatabase
        )
    }
    insert = async (req: Request, res: Response) => {
        try {
            const {name,
                id_MercadoLivre,
                email,
                CPF,
                telephone,
                CEP,
                address,
                number,
                complemento,
                bairro,
                city} = req.body;
            const token: string = String(req.headers.authorization);
            const result = await this.
                clientsBusiness.insert({
                    name,
                    id_MercadoLivre,
                    email,
                    CPF,
                    telephone,
                    CEP,
                    address,
                    number,
                    complemento,
                    bairro,
                    city
                }, token);
            res.status(200).send(result);
        } catch (error) {
            const { statusCode, message} = error;
            res.status(statusCode || 400).send({ message });
        }
    }
}