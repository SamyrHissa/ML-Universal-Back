import BaseDataBase from "../../data/BaseDatabase";
import { ClientDatabase } from "../../data/ClientDatabase";
import { CustomError } from "../../errors/CustomError";
import { ClienteModel } from "../../model/clients/Client.Model";
import { insertClientDTO } from "../../model/clients/clients.interface";
import { IdGenerator } from "../../services/idGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";
import { IClietsBusiness } from "./Clients.Business.Interface";


export class ClientBusiness implements IClietsBusiness {
    constructor(
        private idGenerator : IdGenerator,
        private tokenGenerator: TokenGenerator,
        private database: ClientDatabase
    ){}
    insert = async (product: insertClientDTO, token: string): Promise<ClienteModel> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    update = async (product: ClienteModel, token: String): Promise<boolean> => {
        try {
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    delete = async (id:string, token: string): Promise<boolean> => {
        try {
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    findById = async (id:string, token: string): Promise<ClienteModel> => {
        try {
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    getAll = async (token: string): Promise<ClienteModel[]> => {
        try {
            
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}