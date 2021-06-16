import { convertObjectListToMap } from '../utils/maps'
import { Container } from '../data-model/container'

export class User{
    name:string = '';
    _id:string = '';
    itemHistory = {};
    containers = {};

    constructor(user?){
        if(!!user){ Object.assign(this, user); }
    }
}