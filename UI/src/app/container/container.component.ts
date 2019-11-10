import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Container } from '../data-model/container';
import { Item } from '../data-model/item';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { ItemContextMenuOptionsEnum } from './item-context-menu/item-context-menu.component';


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
  @Output() onContainerClick = new EventEmitter<Container>();
  @Output() onItemSelect = new EventEmitter<number>();
  @Output() onItemAdd = new EventEmitter<Item>();
  @Output() onItemDel = new EventEmitter<Item>();
  @Output() onItemEdit = new EventEmitter<Item>();
  itemSearchTerm = "";
  
  itemRightClicked:Item = null;
  showItemContextMenu=false;
  itemContextMenuPosition:{x:number,y:number}={x:0,y:0}


  constructor(private router:Router, private sessionSv:SessionService, public dialog: MatDialog, private renderer:Renderer2) {}

  ngOnInit() {
    if(this.container == null && this.container == null){
      this.container = new Container({
        _id:0,
        name:"bloob",
        availableItems:{0:new Item({name:"bleep Bloob so long that it wraps around",_id:0}),1:new Item({name:"blaab",_id:1})}
      } as Container);
    }
  }

  onClick(){
    this.onContainerClick.emit(this.container)
  }

  onItemClick(event,itemIndex){
    event.stopPropagation();
    this.onItemSelect.emit(itemIndex)
  }

  onAddClick(){
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      width: '30vw',
      data: {title:"Add New Item", value:new Item()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        result = new Item(result)
        this.onItemAdd.emit(result)
      }
    });
  }

  onItemRightClick(event,item:Item){
    if(this.canAddNewItem){
      this.itemContextMenuPosition = {x:event.x,y:event.y}
      this.showItemContextMenu = true;
      this.itemRightClicked = item;
      return false;
    }
  }

  onItemContextMenuOptionSelect(option:ItemContextMenuOptionsEnum){
    this.showItemContextMenu = false;
    switch(option){
      case ItemContextMenuOptionsEnum.DELETE:{
        this.onItemDel.emit(this.itemRightClicked)
        break;
      }
      case ItemContextMenuOptionsEnum.EDIT:{
        const dialogRef = this.dialog.open(GenericDialogComponent, {
          width: '30vw',
          data: {title:"Edit Item", value:this.itemRightClicked}
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
}
