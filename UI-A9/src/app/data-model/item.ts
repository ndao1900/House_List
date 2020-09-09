export class Item{
    _id:string;
    name:string;
    lifetime:number;

    constructor(itemFromDb){
        Object.assign(this, JSON.parse(JSON.stringify(itemFromDb)));
    }
}