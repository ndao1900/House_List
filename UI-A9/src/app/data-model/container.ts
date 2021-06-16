import { Item } from './item';
import { QuantityMap } from './quanityMap';

export class Container{
    _id:string
    name:string
    layout
    items: {[id:string]:QuantityMap}

    constructor(container?){
        Object.assign(this, container);
        this.items = this.addToItemMap({},container)
        if(!!container.layout){
            if(!!container.layout.tiles){
                container.layout.tiles.forEach(tile => {this.items = this.addToItemMap(this.items,tile)})
            }
        }
    }

    addToItemMap(itemMap, container){
        let newItemMap = JSON.parse(JSON.stringify(itemMap));
        container.containerItems.map(
            (itemQty) => {
                const itemId = itemQty.item._id;
                const quanityCreatedTime = itemQty.createdAt; 
                if(newItemMap[itemId]){
                    if(!!newItemMap[itemId]["quantityMap"][container._id]){
                        if(!!newItemMap[itemId]["quantityMap"][container._id]["quantityMap"][quanityCreatedTime]){
                            throw new Error("duplicated quantity entry" + JSON.stringify(itemQty))
                        }else{
                            newItemMap[itemId]["quantityMap"][container._id]["quantityMap"][quanityCreatedTime] = {...itemQty, quantityMapLevel: 'createdDate'}
                        }
                    }else{
                        newItemMap[itemId]["quantityMap"][container._id] = {
                            name: container.name,
                            quantityMap:{[quanityCreatedTime]:{...itemQty, quantityMapLevel: 'createdDate'}},
                            quantityMapLevel: 'container'
                        }
                    }
                }else{
                    newItemMap[itemId] = {
                        ...itemQty.item,
                        quantityMap:{
                            [container._id]:{
                                name: container.name,
                                quantityMap:{[quanityCreatedTime]:{...itemQty, quantityMapLevel: 'createdDate'}},
                                quantityMapLevel:'container'
                            },
                        },
                    }
                }
            }
        );
        return newItemMap;
    }
}