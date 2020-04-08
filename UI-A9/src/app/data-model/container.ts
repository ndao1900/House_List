import { Thing } from './thing';
import { Item } from './item';

export class Container extends Thing{
    availableItems?:{[_id:number]:Item}
    items?:{[_id:number]:Item}

    constructor(container?:any){
        super(container);
        this.availableItems = {}
        this.items = {}
        if(container)
            Object.assign(this,container)
    }

    getReverse(){
        let rev = new Container(this);
        rev.items = JSON.parse(JSON.stringify(this.availableItems))
        rev.availableItems = JSON.parse(JSON.stringify(this.items))
        return rev;
    }
}