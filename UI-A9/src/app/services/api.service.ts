import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { SERVICES } from '../interceptors/base-url-interceptor.service';
import { Container } from '../data-model/container'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user;
  itemStore;
  containerMap;

  constructor(private sessionSv:SessionService, private httpClient:HttpClient) {
    sessionSv.getUser().subscribe( user => {this.user = user});
    sessionSv.getItemHistory().subscribe( itemStore => {this.itemStore = itemStore});
    sessionSv.getContainerMap().subscribe( containerMap => {this.containerMap = containerMap});
  }

  async addContainer(container){
    return new Promise((resolve, reject) => {
      this.httpClient.post(
        `/containers/${this.user._id}`,
        container,
        {headers: {service: SERVICES.BACKEND}}
      ).toPromise()
        .then( (container:{_id:string}) => {
          this.sessionSv.setContainerMap({...this.containerMap, [container._id]:new Container(container)})
          resolve(container);
        })
        .catch( e => {
          console.error(e);
          reject(e);
        })
    });
  }

  async addItemToContainer(containerId, itemId, quantity){
    return new Promise((resolve, reject) => {
      this.httpClient.post(
        `/containers/${containerId}/addItem`, 
        {
          item: itemId,
          quantity: quantity
        },
        {headers: {service: SERVICES.BACKEND}}
      ).toPromise()
      .then(() => this.getContainer(containerId))
      .catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }

  async addItemToStorage(item: { name: any; lifetime: any; }){
    return new Promise((resolve, reject) =>{
      this.httpClient.post(`/users/addItemHistory/`, item, {headers: {service: SERVICES.BACKEND}})
          .toPromise()
          .then( 
            (item:any) => {
              this.sessionSv.setItemHistory({...this.itemStore, [item._id]:item})
              resolve(item)
            }
          )
          .catch(err => {
            console.error(err)
            reject(err)
          })
    })
  } 

  async getUserData(id='5ef6d1817f11da1fa82f9b56'){
    return new Promise( (resolve, reject) => {
      this.httpClient.get(`/users/${id}`, {headers: {service: SERVICES.BACKEND}}).toPromise()
        .then(
          (user:{_id:string; name:string}) => {
            const containerMap = user['containers'].reduce(
              (acc, container) => {
                return {...acc, [container._id]:new Container(container)}
              },
              {}
            )
      
            const itemHistory = user['itemHistory'].reduce(
              (acc, item) => ({...acc, [item._id]:item}),
              {}
            )
      
            this.sessionSv.setUser(user);
            this.sessionSv.setContainerMap(containerMap);
            this.sessionSv.setItemHistory(itemHistory);
            resolve(user)
          }
      )
      .catch( e =>{
        console.error(e)
        reject(e)
      })
    });
  }

  async getContainer(containerId){
    return new Promise((resolve, reject) => {
      this.httpClient.get(
        `/containers/${containerId}`,
        {headers: {service: SERVICES.BACKEND}}
      ).toPromise()
        .then((container:any) => {
          this.sessionSv.setContainerMap({...this.containerMap, [container._id]: new Container(container)})
          resolve(container)
        })
        .catch(e => {
          console.error(e);
          reject(e);
        })
    })
  }

  async addItemQuantity({containerItemId, newQuantity}){
    return new Promise( (resolve, reject) => {
      this.httpClient.put(
        `/containerItems/${containerItemId}`, 
        { quantity: newQuantity },
        {headers: {service: SERVICES.BACKEND}}
      ).toPromise()
        .then((containerItem:any) => {
          this.getContainer(containerItem.container);
          resolve()
        })
        .catch(e => {
          console.error(e);
          reject(e);
        })
    })
  }


}
