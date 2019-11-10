import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Container } from '../data-model/container';
import { Item } from '../data-model/item'
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { resolve } from 'url';

@Injectable({providedIn:'root'})
export class SessionService {

  selectedContainer = new BehaviorSubject<Container>(new Container);
  itemStorage = new BehaviorSubject<Container>(new Container({
    name:"Item Storage",
    items:{
      0:new Item({_id:0,name:"banana"}),
      1:new Item({_id:1,name:"bread"}),
      2:new Item({_id:2,name:"muffin"}),
      3:new Item({_id:3,name:"pepper"}),
    }
  }))

  constructor(private httpClient:HttpClient, private envSv:EnvService) { }

  getSelectedContainer(){
    return this.selectedContainer.asObservable();
  }

  setSelectedContainer(container:Container){
    this.selectedContainer.next(container);
  }

  getItemStorage(){
    return this.itemStorage.asObservable()
  }

  setItemStorage(container:Container){
    this.itemStorage.next(container)
  }
  
  async refreshItemStorage(){
    return new Promise(async resolve=>{
      await this.httpClient.get(this.envSv.getBE_URL()+"/items")
      .toPromise().then((items:Array<any>)=>{
        let itemsMap = items.reduce((map,obj,index)=>{
          if(obj['_id'])
            map[obj['_id']] = obj;
          else
            console.error("Missing id in item: "+JSON.stringify(obj))
          return map;
        },{})
        this.setItemStorage(new Container({items:itemsMap}))
      })
      resolve(null)
    })

  }
}
