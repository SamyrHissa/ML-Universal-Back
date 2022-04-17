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
    insert = async (client: insertClientDTO, token: string): Promise<ClienteModel> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            if((!client.CPF)||(!client.name)){
                throw new CustomError(412, "Fields requered or falue!");
            }
            const id: string = this.idGenerator.generate();
            const newClient = ClienteModel.toClientDTI(client);
            newClient.id = id;
            newClient.status = 0;
            newClient.date_Status = new Date();
            newClient.id_User = tokenValidation.id;
            newClient.date_Create = new Date();
            // newClient.date_Update = new Date();
            await this.database.insert(newClient);
            return ClienteModel.toClientModel(newClient);
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    update = async (client: insertClientDTO, id: string,  token: string): Promise<ClienteModel> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            if((!client.CPF)||(!client.name)){
                    throw new CustomError(412, "Fields requered or falue!");
                }
            const existClient = await this.database.findById(id);
            if(!existClient){
                throw new CustomError(404, "'id' not found!")
            }
            const ClientUP = ClienteModel.toClientModel(client);
            ClientUP.setId(id);
            ClientUP.setId_User(tokenValidation.id)
            ClientUP.setDate_Update(new Date());
            const result = await this.database.update(ClientUP);
            return ClientUP;
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    delete = async (id:string, token: string): Promise<boolean> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            
            const exist = await this.database.findById(id);
            if(!exist?.getId()){
                throw new CustomError(404, "'id' not found!")
            }
            await this.database.delete(id);
            return true;
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    findById = async (id:string, token: string): Promise<ClienteModel | undefined> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            
            const exist = await this.database.findById(id);
            
            return exist;
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    getAll = async (token: string): Promise<ClienteModel[]> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            const result = await this.database.getAll();
            return result;
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}