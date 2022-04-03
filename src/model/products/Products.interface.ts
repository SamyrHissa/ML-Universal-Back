export interface insertProductDTO {
    description: string, 
    SKU: string, 
    unit: string,
    price: number,
    qty_Min: number,
    qty_Max: number
}
export interface insertProductDTI {
    id: string, 
    description: string, 
    SKU: string, 
    unit: string, 
    price: number, 
    qty_Min: number, 
    qty_Max: number, 
    status: number, 
    date_Status: Date,
    id_User: string, 
    date_Create: Date,
    date_Update: Date,
}