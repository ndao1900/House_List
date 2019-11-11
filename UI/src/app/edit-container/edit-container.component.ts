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

  constructor(private sessionSv:SessionService, private router:Router, public dialog: MatDialog,
     private httpClient:HttpClient, private envSv:EnvService) { }

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

  onContainerItemSelect(_id){
    let item = this.selectedContainer.items[_id];
    if(item.quantity == 1)
      delete this.selectedContainer.items[_id];
    else
      item.quantity--;
    this.updateItemsStyle("availItem");
    this.containerChanged = true;
  }

  onAvailableItemSelect(_id){
    if(this.selectedContainer.items[_id])
      this.selectedContainer.items[_id].quantity++
    else
      this.selectedContainer.items[_id] = new Item(this.selectedContainer.availableItems[_id])
    this.updateItemsStyle("availItem");
    this.containerChanged = true;
  }

  onAvailableItemContextMenu(_id){
    delete this.selectedContainer.availableItems[_id]
    this.itemStorage.items[_id].style = {};
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
    if(!this.selectedContainer.availableItems[_id]){
      this.selectedContainer.availableItems[_id] = Object.assign({},this.itemStorage.items[_id])
      this.updateItemsStyle("");
      this.addingItem = false;
      this.containerChanged = true;
    }
  }

  onBackDropClick(event){
    if(event.target === event.currentTarget) 
      this.addingItem = false
  }

  async onStorageItemAdd(item:Item){
    await this.httpClient.post(this.envSv.getBE_URL()+'/items',item).toPromise();
    this.sessionSv.refreshItemStorage();
  }

  async onStorageItemDel(item:Item){
    await this.httpClient.delete(this.envSv.getBE_URL()+'/items/'+item._id).toPromise();
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
}
