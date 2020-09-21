export class QuantityMap {
    level:string;
    name:string;
    quantityMap:{[id:string]:QuantityMap};
    quantity:number;
    _id?:string;
}