
export class Product {
    constructor(
        private id: string,
        private description: string,
        private SKU: string,
        private unit: string,
        private price: number,
        private qty_Min: number,
        private qty_Max: number
    ) {}
    getId = (): string => this.id;
    getDescription = ():string => this.description;
    getSKU = (): string => this.SKU;
    getUnit = (): string => this.unit;
    getPrice = (): number => this.price;
    getQty_Min = (): number => this.qty_Min;
    getQty_Max = (): number => this.qty_Max;

    static toProductModel(data: any): Product {
        return new Product(
            data.id, 
            data.description, 
            data.SKU, 
            data.unit,
            data.price,
            data.qty_Min,
            data.qty_Max
            );
     }
}
export interface insertProductDTO {
    description: string, 
    SKU: string, 
    unit: string,
    price: number,
    qty_Min: number,
    qty_Max: number
}