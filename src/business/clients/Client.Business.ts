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
            if((!client.CEP)||(!client.CPF)||(!client.address)||(!client.bairro)
            ||(!client.city)||(!client.complemento)||(!client.email)||(!client.id_MercadoLivre)
            ||(!client.name)||(!client.number)||(!client.telephone)){
                throw new CustomError(412, "Fields requered or falue!");
            }
            const id: string = this.idGenerator.generate();
            const newClient = ClienteModel.toClientDTI(client);
            newClient.id = id;
            newClient.status = 0;
            newClient.date_Status = new Date();
            newClient.id_User = tokenValidation.id;
            newClient.date_Create = new Date();
            newClient.date_Update = new Date();
            await this.database.insert(newClient);
            return ClienteModel.toClientModel(newClient);
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    update = async (client: ClienteModel, token: string): Promise<boolean> => {
        try {
            const tokenValidation = this.tokenGenerator.getTokenData(token);
            if(!tokenValidation){
                throw new CustomError(401, "Token Unauthorized")
            }
            if(tokenValidation.role !== "ADMIN"){
                throw new CustomError(401, "You are not authorized for this action");
            }
            if((!client.getAddress())||(!client.getBairro())||(!client.getCEP())
                ||(!client.getCPF())||(!client.getCity())||(!client.getComplemento())
                ||(!client.getDate_Update())||(!client.getEmail())
                ||(!client.getId())||(!client.getId_MercadoLivre())
                ||(!client.getName())||(!client.getNumber())||(!client.getTelephone())){
                    throw new CustomError(412, "Fields requered or falue!");
                }
            const existClient = await this.database.findById(client.getId());
            if(!existClient){
                throw new CustomError(404, "'id' not found!")
            }
            const result = await this.database.insert(ClienteModel.toClientDTI(client));
            return true;
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
            if(!exist){
                throw new CustomError(404, "'id' not found!")
            }
            await this.database.delete(id);
            return true;
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    findById = async (id:string, token: string): Promise<ClienteModel> => {
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