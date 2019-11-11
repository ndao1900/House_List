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
  itemStorage = new BehaviorSubject<Container>({})
  containerMap = new BehaviorSubject<any>({})

  constructor(private httpClient:HttpClient, private envSv:EnvService) { }

  getSelectedContainer(){return this.selectedContainer.asObservable();}

  setSelectedContainer(container:Container){this.selectedContainer.next(container);}

  getItemStorage(){return this.itemStorage.asObservable()}

  setItemStorage(container:Container){this.itemStorage.next(container)}
  
  getContainerMap(){return this.containerMap.asObservable()}

  setContainerMap(containerMap:any){this.containerMap.next(containerMap)}
  
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
        this.setItemStorage(new Container({name:'Item Storage',items:itemsMap}))
      })
      resolve(null)
    })
  }

  async refreshContainers(){
    return new Promise(async resolve=>{
      await this.httpClient.get(this.envSv.getBE_URL()+"/containers").toPromise()
      .then((containers:Array<any>)=>{
        let newContainerMap = containers.reduce((map,obj,index)=>{
          if(obj['_id'])
            map[obj['_id']] = obj;
          else
            console.error("Missing id in item: "+JSON.stringify(obj))
          return map;
        },{})
        this.setContainerMap(newContainerMap)
      })
      resolve(null)
    })
  }
}
