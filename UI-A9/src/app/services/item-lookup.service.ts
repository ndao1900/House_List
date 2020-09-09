import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../data-model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemLookupService {

  onItemPicked = new EventEmitter<Item>();
  constructor() { }
}
