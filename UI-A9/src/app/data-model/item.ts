import { Thing } from './thing';

export class Item extends Thing{
    price?:number;
    unit?:string;
    quantity?:number;
    style?:any;

    constructor(item?:Item){
        super();
        this.price = 0;
        this.unit ="";
        this.quantity = 1;
        if(item){
            Object.assign(this,item);
            this.name = this.name.toLowerCase();
        }
    }
}