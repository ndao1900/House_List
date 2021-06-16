import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Container } from '../data-model/container';
import { Item } from '../data-model/item'
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';
import { resolve } from 'url';
import { FloatingPanelContentEnum } from '../enums/floating-panel-content'
import { ApiService } from './api.service';
import { User } from '../data-model/user';

@Injectable({providedIn:'root'})
export class SessionService {
  private user = new BehaviorSubject<User>(null);
  private itemHistory = new BehaviorSubject<Object>({});
  private containers = new BehaviorSubject<Object>({});

  constructor(public httpClient:HttpClient, public envSv:EnvService) { }

  getUser(){ return this.user.asObservable() }
  setUser(user){ 
    this.user.next( user );
    this.setItemHistory(user.itemHistory);
    this.setContainers(user.containers);
  }

  getItemHistory(){ return this.itemHistory.asObservable(); }
  setItemHistory(itemHistory){ this.itemHistory.next(itemHistory); }
  
  getContainers(){ return this.containers.asObservable(); }
  setContainers(containers){ this.containers.next(containers); }

  getItem(itemName:string){ return Object.assign({}, this.itemHistory.getValue()[itemName.toUpperCase()]) }
}
