import { Injectable } from '@angular/core';
import { Item } from '../data-model/item';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getObjectKeys(obj){
    return Object.keys(obj)
  }

  getObjectValues(obj){
    return Object.values(obj)
  }

  arrayToMap(arr:Array<any>){
    let map = {}
    arr.map(item=>{map[item.toString()]=0})
    return map
  }

  sortAvailItem(a:Item,b:Item){
    if(a.style)
      return Object.keys(a.style).length < Object.keys(b.style).length? -1:1;
    else
      return 1;
  }
}
