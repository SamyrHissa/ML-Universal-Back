
export class ClienteModel {
    constructor(
        private id: string,
        private name: string,
        private id_MercadoLivre: string,
        private email: string,
        private CPF: string,
        private telephone: string,
        private CEP: string,
        private address: string,
        private number: string,
        private complemento: string,
        private bairro: string,
        private city: string,
        private status: number,
        private date_Status: Date,
        private id_User: string,
        private date_Create: Date,
        private date_Update: Date
    ){}
    getId = (): string => this.id;
    getName = (): string => this.name;
    getId_MercadoLivre = (): string => this.id_MercadoLivre;
    getEmail = (): string => this.email;
    getCPF = (): string => this.CPF;
    getTelephone = (): string => this.telephone;
    getCEP = (): string => this.CEP;
    getAddress = (): string => this.address;
    getNumber = (): string => this.number;
    getComplemento = (): string => this.complemento;
    getBairro = (): string => this.bairro;
    getCity = (): string => this.city;
    getStatus = (): number => this.status;
    getDate_Status = (): Date => this.date_Status;
    getId_User = (): string => this.id_User;
    getDate_Create = (): Date => this.date_Create;
    getDate_Update = (): Date => this.date_Update;

    static toClientModel(data: any): ClienteModel {
        return new ClienteModel(
            data.id,
            data.name,
            data.id_MercadoLivre,
            data.email,
            data.CPF,
            data.telephone,
            data.CEP,
            data.address,
            data.number,
            data.complemento,
            data.bairro,
            data.city,
            data.status,
            data.date_Status,
            data.id_User,
            data.date_Create,
            data.date_Update
        )
    }
}
export interface insertClientDTO {
    name: string,
    id_MercadoLivre: string,
    email: string,
    CPF: string,
    telephone: string,
    CEP: string,
    address: string,
    number: string,
    complemento: string,
    bairro: string,
    city: string
}