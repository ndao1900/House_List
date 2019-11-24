import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Container } from '../data-model/container';
import { Router } from '@angular/router';
import { Item } from '../data-model/item';
import { ContainerComponent } from '../container/container.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../services/env.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ContainerActionsEnum } from '../container/container.component'
import { UtilService } from '../services/util.service';



@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.css']
})
export class EditContainerComponent implements OnInit {
  subs:Array<Subscription> = []

  selectedContainer:Container;
  itemStorage:Container;
  addingItem:boolean;
  containerChanged = false;
  selectedItems = {};
  selectedAvailableItems = {};
  selectedStorageItems = {};
  ContainerActionsEnum = ContainerActionsEnum;
  storageItemActions = {[this.ContainerActionsEnum.CONFIRM]:1, [this.ContainerActionsEnum.ADD]:1, [this.ContainerActionsEnum.REMOVE]:1}
  availableItemActions = {[this.ContainerActionsEnum.REMOVE]:1}

  constructor(private sessionSv:SessionService, public router:Router, public dialog: MatDialog,
     private httpClient:HttpClient, private envSv:EnvService, public locationSv:Location, public utilSv:UtilService) { }

  ngOnInit() {
    this.subs.push(this.sessionSv.getSelectedContainer().subscribe((container:Container)=>{
      this.selectedContainer = container
      this.updateItemsStyle("availItem")
      if(this.selectedContainer.name == null)
        this.router.navigate(['/Home'])
    }))

    this.subs.push(this.sessionSv.getItemStorage().subscribe((container:Container)=>{
      this.itemStorage = container;
      this.updateItemsStyle("");
    }))
  }

  transferLeft(changedMap?, isSecondStep?){
    let processingSelectedItem;
    if(!changedMap){
      processingSelectedItem = this.selectedAvailableItems;
      changedMap = {}
    }
    else{
      processingSelectedItem = this.selectedItems;
    }

    for(let id in processingSelectedItem){
      if(!changedMap[id]){
        if(this.selectedContainer.items[id])
          this.selectedContainer.items[id].quantity++
        else
          this.selectedContainer.items[id] = new Item(this.selectedContainer.availableItems[id])
        changedMap[id] =1;
      }
    }

    if(!isSecondStep)
      this.transferLeft(changedMap,true)
    else{
      this.updateItemsStyle("availItem");
      this.containerChanged = true;
    }
  }

  transferRight(changedMap?,isSecondStep?){
    let processingSelectedItem;
    if(!changedMap){
      processingSelectedItem = this.selectedAvailableItems;
      changedMap = {}
    }
    else{
      processingSelectedItem = this.selectedItems;
    }

    for(let id in processingSelectedItem){
      if(!changedMap[id]){
        let item = this.selectedContainer.items[id];
        if(item.quantity == 1){
          delete this.selectedContainer.items[id];
          delete this.selectedItems[id]
        }
        else
          item.quantity--;
        changedMap[id] = 1;
      }
    }
    
    if(!isSecondStep)
      this.transferRight(changedMap,true)
    else{
      this.updateItemsStyle("availItem");
      this.containerChanged = true;
    }
  }

  onContainerItemSelect(_id){
    if(this.selectedItems[_id] == 1)
      delete this.selectedItems[_id]
    else
      this.selectedItems[_id] = 1
  }

  onAvailableItemSelect(_id){
    if(this.selectedAvailableItems[_id] == 1)
      delete this.selectedAvailableItems[_id]
    else
      this.selectedAvailableItems[_id] = 1
  }

  onAvailableItemContextMenu(_id){
    delete this.selectedContainer.availableItems[_id]
    this.itemStorage.items[_id].style = {};
    this.containerChanged = true;
  }

  onAvailableItemRemove(itemMap){
    for(let _id in itemMap){
      delete this.selectedContainer.availableItems[_id]
      this.itemStorage.items[_id].style = {};
    }
    this.containerChanged = true;
  }

  updateItemsStyle(whichOne:string){
    if(whichOne === "availItem"){
      for(let avail_item_id of Object.keys(this.selectedContainer.availableItems)) {
        if(this.selectedContainer.items[avail_item_id])
          this.selectedContainer.availableItems[avail_item_id].style = {color:"#4bdd4b"};
        else
          this.selectedContainer.availableItems[avail_item_id].style = {};
      }
    }else{
      for(let avail_item_id of Object.keys(this.selectedContainer.availableItems)) {
        if(this.itemStorage.items[avail_item_id])
          this.itemStorage.items[avail_item_id].style = {color:"#4bdd4b"};
        else
          if(this.itemStorage.items[avail_item_id])
            this.itemStorage.items[avail_item_id].style = {};
      }
    }
  }

  onAddClick(){
    this.addingItem = true;
  }

  onStorageItemSelect(_id){
    if(this.selectedStorageItems[_id] == 1)
      delete this.selectedStorageItems[_id]
    else
      this.selectedStorageItems[_id] = 1
  }

  onAddAvailableItem(){
    for(let _id in this.selectedStorageItems){
      if(!this.selectedContainer.availableItems[_id]){
        this.selectedContainer.availableItems[_id] = Object.assign({},this.itemStorage.items[_id])
      }
    }
    this.updateItemsStyle("");
    this.addingItem = false;
    this.containerChanged = true;
    this.selectedStorageItems = {};
  }

  onBackDropClick(event){
    if(event.target === event.currentTarget) 
      this.addingItem = false
  }

  async onStorageItemAdd(item:Item){
    await this.httpClient.post(this.envSv.getBE_URL()+'/items',item).toPromise();
    this.sessionSv.refreshItemStorage();
  }

  async onStorageItemDel(itemMap){
    await this.httpClient.post(this.envSv.getBE_URL()+'/RemoveItems',{'idsToRemove':Object.keys(itemMap)}).toPromise();
    this.sessionSv.refreshItemStorage();
  }

  async onStorageItemEdit(item:Item){
    await this.httpClient.put(this.envSv.getBE_URL()+'/items/'+item._id,item).toPromise();
    this.sessionSv.refreshItemStorage();
  }

  async onSaveClick(){
    await this.httpClient.put(this.envSv.getBE_URL()+'/containers/'+this.selectedContainer._id,this.selectedContainer).toPromise();
    this.containerChanged = false;
  }

  ngOnDestroy(){
    for(let sub of this.subs){
      sub.unsubscribe()
    }
  }

  onBackBtnClick(){
    this.locationSv.back();
  }
}
