import { convertObjectListToMap } from '../utils/maps'
import { Container } from '../data-model/container'

export class User{
    name:string = '';
    _id:string = '';
    itemHistory:String[] = [];
    containers:String[] = [];

    constructor(user?){
        if(!!user){
            user.containers = user.containers.map( container => new Container(container) )
            Object.assign(this, user)
        }
    }

    getContainerMap(){
       return convertObjectListToMap(this.containers, '_id')
    }

    getItemHistoryMap(){
        return convertObjectListToMap(this.itemHistory, '_id')
    }
}