import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { SERVICES } from '../interceptors/base-url-interceptor.service';
import { Container } from '../data-model/container'
import { EnvService } from './env.service';
import userData from '../../assets/mockUser.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user;
  itemStore;
  containerMap;

  constructor(private sessionSv:SessionService, private httpClient:HttpClient, private envSv:EnvService) {
    sessionSv.getUser().subscribe( user => {this.user = user});
  }

  // async addContainer(container){
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(
  //       `/containers`,
  //       container,
  //       {headers: {service: SERVICES.BACKEND}}
  //     ).toPromise()
  //       .then( (container:{_id:string}) => {
  //         this.sessionSv.setContainerMap({...this.containerMap, [container._id]:new Container(container)})
  //         resolve(container);
  //       })
  //       .catch( e => {
  //         console.error(e);
  //         reject(e);
  //       })
  //   });
  // }

  // async addItemToContainer(containerId, itemId, quantity){
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(
  //       `/containers/${containerId}/addItem`, 
  //       {
  //         item: itemId,
  //         quantity: quantity
  //       },
  //       {headers: {service: SERVICES.BACKEND}}
  //     ).toPromise()
  //     .then(() => this.getContainer(containerId))
  //     .catch(err => {
  //       console.error(err)
  //       reject(err)
  //     })
  //   })
  // }

  // async addItemToStorage(item: { name: any; lifetime: any; }){
  //   return new Promise((resolve, reject) =>{
  //     this.httpClient.post(`/users/addItemHistory/`, item, {headers: {service: SERVICES.BACKEND}})
  //         .toPromise()
  //         .then( 
  //           (item:any) => {
  //             this.sessionSv.setItemHistory({...this.itemStore, [item._id]:item})
  //             resolve(item)
  //           }
  //         )
  //         .catch(err => {
  //           console.error(err)
  //           reject(err)
  //         })
  //   })
  // } 

  async getUser(id='60b303e782c249181cfbc19b'){
    if(this.envSv.useMockData){
      return new Promise((resolve, reject) => resolve(userData))
    } else {
      return new Promise( (resolve, reject) => {
        this.httpClient.get(`/users/${id}`, {headers: {service: SERVICES.BACKEND}}).toPromise()
          .then(
            (user) => {
              this.sessionSv.setUser(user);
              resolve(user)
            }
        )
        .catch( e =>{
          console.error(e)
          reject(e)
        })
      });
    }
  }

  // async getContainer(containerId){
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.get(
  //       `/containers/${containerId}`,
  //       {headers: {service: SERVICES.BACKEND}}
  //     ).toPromise()
  //       .then((container:any) => {
  //         this.sessionSv.setContainerMap({...this.containerMap, [container._id]: new Container(container)})
  //         resolve(container)
  //       })
  //       .catch(e => {
  //         console.error(e);
  //         reject(e);
  //       })
  //   })
  // }

  // async addItemQuantity({containerItemId, newQuantity}){
  //   return new Promise( (resolve, reject) => {
  //     this.httpClient.put(
  //       `/containerItems/${containerItemId}`, 
  //       { quantity: newQuantity },
  //       {headers: {service: SERVICES.BACKEND}}
  //     ).toPromise()
  //       .then((containerItem:any) => {
  //         this.getContainer(containerItem.container);
  //         resolve()
  //       })
  //       .catch(e => {
  //         console.error(e);
  //         reject(e);
  //       })
  //   })
  // }


}
