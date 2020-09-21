import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Container } from '../data-model/container';
import { Item } from '../data-model/item'
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { resolve } from 'url';
import { FloatingPanelContentEnum } from '../enums/floating-panel-content'
import { ApiService } from './api.service';

@Injectable({providedIn:'root'})
export class SessionService {
  private user = new BehaviorSubject<{_id:string; name:string}>(null);
  private selectedContainerId = new BehaviorSubject<string>(null);
  private itemHistory = new BehaviorSubject<{[id:number]:Item}>(null);
  private containerMap = new BehaviorSubject<any>(null)


  constructor(public httpClient:HttpClient, public envSv:EnvService) { }

  getUser(){ return this.user.asObservable() }
  setUser(user){ this.user.next( {_id:user._id, name:user.name} ) }

  getSelectedContainer(){return this.selectedContainerId.asObservable();}
  setSelectedContainer(containerId:string){this.selectedContainerId.next(containerId);}

  getItemHistory(){return this.itemHistory.asObservable()}
  setItemHistory(newItemStore){this.itemHistory.next(newItemStore)}
  
  getContainerMap(){return this.containerMap.asObservable()}
  setContainerMap(containerMap:any){this.containerMap.next(containerMap)}
}
