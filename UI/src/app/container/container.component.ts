import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Container } from '../data-model/container';
import { Item } from '../data-model/item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { ItemContextMenuOptionsEnum } from './item-context-menu/item-context-menu.component';
import { timeout } from 'q';
import { UtilService } from '../services/util.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input() container:Container
  @Input() editable;
  @Input() canAddNewItem=false;
  @Input() itemStyleMap:{[_id:number]:any}
  @Input() selectedItems={};
  @Input() availableActions={};
  @Input() sortFunction:(a:Item,b:Item)=>number;
  @Output() onContainerClick = new EventEmitter<Container>();
  @Output() onItemSelect = new EventEmitter<any>();
  @Output() onItemContextMenu = new EventEmitter<any>();
  @Output() onItemAdd = new EventEmitter<{[id:number]:Item}>();
  @Output() onItemDel = new EventEmitter<{[id:number]:Item}>();
  @Output() onItemEdit = new EventEmitter<{[id:number]:Item}>();
  @Output() onConfirm = new EventEmitter<any>();
  itemSearchTerm = "";
  
  itemRightClicked:Item = null;
  showItemContextMenu=false;
  itemContextMenuPosition:{x:number,y:number}={x:0,y:0};
  availableContextMenuOption = [ItemContextMenuOptionsEnum.DELETE, ItemContextMenuOptionsEnum.EDIT];
  private timer;
  private ctxMnOutClick = 0;
  ContainerActionsEnum = ContainerActionsEnum;



  constructor(private router:Router, private sessionSv:SessionService, public dialog: MatDialog, private renderer:Renderer2,
    public utilSv:UtilService) {}

  ngOnInit() {
    // if(this.container == null && this.container == null){
    //   this.container = new Container({
    //     _id:0,
    //     name:"bloob",
    //     availableItems:{0:new Item({name:"bleep Bloob so long that it wraps around",_id:0}),1:new Item({name:"blaab",_id:1})}
    //   } as Container);
    // }
  }

  onClick(){
    this.onContainerClick.emit(this.container)
  }

  onItemClick(event,itemId){
    event.stopPropagation();
    this.onItemSelect.emit(itemId)
  }

  onAddClick(){
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      width: '80vw',
      data: {title:"Add New Item", value:new Item()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        result = new Item(result)
        this.onItemAdd.emit(result)
      }
    });
  }

  onRemovedClick(){
    this.onItemDel.emit(this.selectedItems)
  }

  onEditClick(){
    //switch to edit mode - replace items rows with input fields
  }

  onConfirmClick(){
    this.onConfirm.emit();
  }

  onItemRightClick(event,item:Item){
    if(this.canAddNewItem){
      this.itemContextMenuPosition = {x:event.x,y:event.y}
      this.showItemContextMenu = true;
      this.itemRightClicked = item;
    }
    this.onItemContextMenu.emit(item._id)
    return false;
  }

  onItemMouseDown(event,item:Item){
    this.timer = setTimeout(()=>{
      this.onItemRightClick(event,item)
    },1000)
  }

  onItemMouseUp(event,item:Item){
    if(this.showItemContextMenu){
      event.stopPropagation();
    }
    else{
      this.onItemClick(event,item._id)
    }

    clearTimeout(this.timer)
  }

  onItemContextMenuOptionSelect(option:ItemContextMenuOptionsEnum){
    this.showItemContextMenu = false;
    switch(option){
      case ItemContextMenuOptionsEnum.DELETE:{
        this.onItemDel.emit({[this.itemRightClicked._id]:this.itemRightClicked})
        break;
      }
      case ItemContextMenuOptionsEnum.EDIT:{
        const dialogRef = this.dialog.open(GenericDialogComponent, {
          width: '80vw',
          data: {title:"Edit Item "+this.itemRightClicked.name, value:this.itemRightClicked}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result != null){
            result = new Item(result)
            this.onItemEdit.emit(result)
          }
        });
      }
    }
  }

  hideContextMenu(){
    if(this.ctxMnOutClick == 1){
      this.showItemContextMenu = false
      this.ctxMnOutClick = 0;
    }
    else this.ctxMnOutClick++;
  }

  getSortedItemArr(){
    let arr = Object.values(this.container.items)
    let sortFunct = this.sortFunction;
    if(sortFunct) 
      arr.sort(this.sortFunction)
    else
      arr.sort((a,b)=>{return a.quantity < b.quantity? -1:1})
    return arr;
  }
}

export enum ContainerActionsEnum{
  REMOVE = "remove",
  CONFIRM = "confirm",
  ADD = 'add',
  EDIT = 'edit'
}
