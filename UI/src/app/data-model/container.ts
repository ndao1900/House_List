import { Thing } from './thing';
import { Item } from './item';

export class Container extends Thing{
    availableItems?:{[_id:number]:Item}
    items?:{[_id:number]:Item}

    constructor(container?:Container){
        super(container);
        this.availableItems = {}
        this.items = {}
        if(container)
            Object.assign(this,container)
    }
}