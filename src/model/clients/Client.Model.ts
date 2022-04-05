import { insertClientDTI } from "./clients.interface";

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

    setId = (value: string) => this.id = value;
    setName = (value: string) => this.name = value;
    setId_MercadoLivre = (value: string) => this.id_MercadoLivre = value;
    setEmail = (value: string) => this.email = value;
    setCPF = (value: string) => this.CPF = value;
    setTelephone = (value: string) => this.telephone = value;
    setCEP = (value: string) => this.CEP = value;
    setAddress = (value: string) => this.address = value;
    setNumber = (value: string) => this.number = value;
    setComplemento = (value: string) => this.complemento = value;
    setBairro = (value: string) => this.bairro = value;
    setCity = (value: string) => this.city = value;
    setDate_Status = (value: Date) => this.date_Status = value;
    setId_User = (value: string) => this.id_User = value;
    setDate_Create = (value: Date) => this.date_Create = value;
    setDate_Update = (value: Date) => this.date_Update = value;

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
    static toClientDTI(data: any): insertClientDTI {
        return {
            id: data.id,
            name: data.name,
            id_MercadoLivre: data.id_MercadoLivre,
            email: data.email,
            CPF: data.CPF,
            telephone: data.telephone,
            CEP: data.CEP,
            address: data.address,
            number: data.number,
            complemento: data.complemento,
            bairro: data.bairro,
            city: data.city,
            status: data.status,
            date_Status: data.date_Status,
            id_User: data.id_User,
            date_Create: data.date_Create,
            date_Update: data.date_Update
        }
    }
}