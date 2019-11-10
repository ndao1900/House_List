import { Thing } from './thing';
import { Item } from './item';

export class Container extends Thing{
    availableItems?:{[_id:number]:Item}
    items?:{[_id:number]:Item}

    constructor(container?:Container){
        super(container);
        this.availableItems = {
            0:new Item({_id:0,name:"banana"}),
            1:new Item({_id:1,name:"bread"}),
            2:new Item({_id:2,name:"muffin"}),
        }
        this.items = {}
        if(container)
            Object.assign(this,container)
    }
}