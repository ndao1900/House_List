export class Thing{
    _id?:number;
    name?:string

    constructor(obj?:Thing){
        this.name = null;
        if(obj)
            Object.assign(this,obj)
    }
}