import { ClienteModel } from "../model/clients/Client.Model";
import BaseDataBase from "./BaseDatabase";
import { clientsTableName } from "./TableNames";

export class ClientDatabase extends BaseDataBase {
    protected tableName: string = clientsTableName;

    async insert(client: ClienteModel): Promise<void> {
        try {
        const entityModel = {
            "id": client.getId(),
            "name": client.getName(),
            "id_MercadoLivre": client.getId_MercadoLivre(),
            "email": client.getEmail(),
            "CPF": client.getCPF(),
            "telephone": client.getTelephone(),
            "CEP": client.getCEP(),
            "number": client.getNumber(),
            "complemento": client.getComplemento(),
            "bairro": client.getBairro(),
            "city": client.getCity(),
            "status": client.getStatus(),
            "date_status": client.getDate_Status(),
            "id_User": client.getId_User(),
            "date_create": client.getDate_Create(),
            "date_update": client.getDate_Update()
        }
            await BaseDataBase.connection(this.tableName)
            .insert(entityModel);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async update(client: ClienteModel): Promise<void> {
        try {
            const result = await BaseDataBase.connection(this.tableName)
            .update({
                "name": client.getName(),
                "id_MercadoLivre": client.getId_MercadoLivre(),
                "email": client.getEmail(),
                "CPF": client.getCPF(),
                "telephone": client.getTelephone(),
                "CEP": client.getCEP(),
                "number": client.getNumber(),
                "complemento": client.getComplemento(),
                "bairro": client.getBairro(),
                "city": client.getCity(),
                "status": client.getStatus(),
                "date_status": client.getDate_Status(),
                "id_User": client.getId_User(),
                "date_create": client.getDate_Create(),
                "date_update": client.getDate_Update()
            })
            .where("id", client.getId())
        // return true
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async delete(id: string) {
        try {
            await BaseDataBase.connection.raw(`
            DELETE FROM ${this.tableName} WHERE id = "${id}"
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}