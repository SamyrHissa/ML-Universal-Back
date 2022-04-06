import { ClienteModel } from "../../model/clients/Client.Model";
import { insertClientDTO } from "../../model/clients/clients.interface";

export interface IClietsBusiness {
    insert(client: insertClientDTO, token: string): Promise<ClienteModel>;
    update(client: ClienteModel, token: String): Promise<boolean>;
    delete(id:string, token: string): Promise<boolean>;
    findById(id:string, token: string): Promise<ClienteModel>;
    getAll(token: string): Promise<ClienteModel[]>;
}