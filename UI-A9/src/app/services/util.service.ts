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

  getInputType(field){
    switch(typeof(field)){
      case "number":
        return "number"
      default:
        return "text"
    }
  }

  arrayToMap(arr:Array<any>){
    let map = {}
    arr.map(item=>{map[item.toString()]=0})
    return map
  }

  isAllTrue(map){
    let ret = true;
    for(let id in map){
      if(!map[id])
        return false;
    }
    return ret;
  }

  setAll(map,val){
    for(let id in map){
      map[id] = val;
    }
  }

  timeStampStringToDate(tsString){
    const [year, month, rest] = tsString.split('-');
    const [day,] = rest.split('T');
    return `${month}/${day}/${year}` 
  }

  getDaysLeft(tsString, lifetime){
    const [year, month, rest] = tsString.split('-');
    const [day,] = rest.split('T');
    const createdDate = Date.UTC(parseInt(year), parseInt(month)-1, parseInt(day));
    const today = new Date().getTime();
    const diffTime = today - createdDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return lifetime - diffDays; 
  }
}
