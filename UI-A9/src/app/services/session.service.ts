import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Container } from '../data-model/container';
import { Item } from '../data-model/item'
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { resolve } from 'url';
import { FloatingPanelContentEnum } from '../enums/floating-panel-content'
import { SERVICES } from '../interceptors/base-url-interceptor.service';

@Injectable({providedIn:'root'})
export class SessionService {
  user = new BehaviorSubject<any>({});
  selectedContainer = new BehaviorSubject({});
  itemHistory = new BehaviorSubject<{[id:number]:Item}>({});
  containerMap = new BehaviorSubject<any>({})

  showFloatingPanel = false;
  fltPnlInput;
  floatingPanelContent:FloatingPanelContentEnum;
  floatPanContStyle = {
    'position':'absolute',
    'width':'50%',
    'height':'80%',
    'background':'white',
    'top': '0',
    'bottom': '0',
    'right':'0',
    'left': '0',
    'margin': 'auto'
  };

  constructor(public httpClient:HttpClient, public envSv:EnvService) { }

  getSelectedContainer(){return this.selectedContainer.asObservable();}

  setSelectedContainer(container:Container){this.selectedContainer.next(container);}

  getItemHistory(){return this.itemHistory.asObservable()}

  setItemHistory(newItemStore){this.itemHistory.next(newItemStore)}
  
  getContainerMap(){return this.containerMap.asObservable()}

  setContainerMap(containerMap:any){this.containerMap.next(containerMap)}
  
  async refreshItemStorage(){
    return new Promise(async resolve=>{
      await this.httpClient.get("/items", {headers: {service: SERVICES.BACKEND}})
      .toPromise().then((items:Array<any>)=>{
        let itemsMap = items.reduce((map,obj,index)=>{
          if(obj['_id'])
            map[obj['_id']] = obj;
          else
            console.error("Missing id in item: "+JSON.stringify(obj))
          return map;
        },{})
        this.setItemHistory(new Container({name:'Item Storage',items:itemsMap}))
      })
      resolve(null)
    })
  }

  async refreshContainers(){
    return new Promise(async resolve=>{
      await this.httpClient.get("/containers",{headers: {service: SERVICES.BACKEND}}).toPromise()
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

  async getUserData(){
    return new Promise((resolve => {
      this.httpClient.get("/users/5ef6d1817f11da1fa82f9b56", {headers: {service: SERVICES.BACKEND}}).subscribe(user => {
        this.user.next({'_id': user['_id'], 'name':user['name']});
        this.setContainerMap(user['containers'].reduce(
          (acc, container) => {
            return {...acc, [container.name]:new Container(container)}
          },
          {}
        ));
        this.setItemHistory(user['itemHistory'].reduce(
          (acc, item) => ({...acc, [item._id]:item}),
          {}
        ))
        resolve(null)
      })
    }))
  }
}
