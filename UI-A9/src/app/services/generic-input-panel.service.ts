import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericInputPanelService {

  onActionTaken = new EventEmitter<{action:string,ret:any}>();
  constructor() { }
}
