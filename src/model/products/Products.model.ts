import { insertProductDTI } from "./Products.interface";

export class ProductModel {
    constructor(
        private id: string,
        private description: string,
        private SKU: string,
        private unit: string,
        private price: number,
        private qty_Min: number,
        private qty_Max: number,
        private status: number,
        private date_Status: Date,
        private id_User: string,
        private date_Create: Date,
        private date_Update: Date
    ) {}
    getId = (): string => this.id;
    getDescription = ():string => this.description;
    getSKU = (): string => this.SKU;
    getUnit = (): string => this.unit;
    getPrice = (): number => this.price;
    getQty_Min = (): number => this.qty_Min;
    getQty_Max = (): number => this.qty_Max;
    getStatus = (): number => this.status;
    getDate_Status = (): Date => this.date_Status;
    getId_User = (): string => this.id_User;
    getDate_Create = (): Date => this.date_Create;
    getDate_Update = (): Date => this.date_Update;
    
    setDescription = (value: string) => this.description = value;
    setSKU = (value: string) => this.SKU = value;
    setUnit = (value: string) => this.unit = value;
    setPrice = (value: number) => this.price = value;
    setQty_Min = (value: number) => this.qty_Min = value;
    setQty_Max = (value: number) => this.qty_Max = value;
    setStatus = (value: number) => this.status = value;
    setDate_Status = (value: Date) => this.date_Status = value;
    setId_User = (value: string) => this.id_User = value;
    setDate_Create = (value: Date) => this.date_Create = value;
    setDate_Update = (value: Date) => this.date_Update = value;

    static toProductModel(data: any): ProductModel {
        return new ProductModel(
            data.id, 
            data.description, 
            data.SKU, 
            data.unit,
            data.price,
            data.qty_Min,
            data.qty_Max,
            data.status,
            data.date_Status,
            data.id_User,
            data.date_Create,
            data.date_Update
            );
     }
     static toProductDTI(data: any): insertProductDTI {
        return {
            id: data.id, 
            description: data.description, 
            SKU: data.SKU, 
            unit: data.unit,
            price: data.price,
            qty_Min: data.qty_Min,
            qty_Max: data.qty_Max,
            status: data.status,
            date_Status: data.date_Status,
            id_User: data.id_User,
            date_Create: data.date_Create,
            date_Update: data.date_Update
        };
     }
}
