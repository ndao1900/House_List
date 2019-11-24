import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { Container } from '../data-model/container';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../services/env.service';
import { ItemContextMenuOptionsEnum } from '../container/item-context-menu/item-context-menu.component';
import { Item } from '../data-model/item';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  containerMap={}
  showItemContextMenu = false;
  itemContextMenuPosition = {x:0,y:0}
  containerRightClicked:Container;
  availableContextMenuOption = [ItemContextMenuOptionsEnum.DELETE,ItemContextMenuOptionsEnum.EDIT]
  sortAvailItem(a:Item,b:Item){
    if(a.style)
      return Object.keys(a.style).length < Object.keys(b.style).length? 1:-1;
    else
      return 1;
  }

  constructor(private sessionSv:SessionService, private router:Router,  public dialog: MatDialog, private httpClient:HttpClient,
    private envSv:EnvService, public utilSv:UtilService) { }

  ngOnInit() {
    this.sessionSv.getContainerMap().subscribe(cMap=>{
      for(let _id in cMap){
        this.containerMap[_id] = new Container(cMap[_id])
      }
    })
    this.sessionSv.refreshContainers();
  }

  onContainerClick(container){
    this.sessionSv.setSelectedContainer(this.containerMap[container._id]);
    this.router.navigate(['/EditContainer'])
  }

  onAddContainerClick(){
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      width: '80vw',
      data: {title:"Add New Container", value:new Container()}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result != null){
        result = new Container(result)
        await this.httpClient.post(this.envSv.getBE_URL()+'/containers/',result).toPromise();
        this.sessionSv.refreshContainers();
      }
    });
  }

  onContainerRightClick(event,container){
    this.itemContextMenuPosition = {x:event.x,y:event.y}
    this.showItemContextMenu = true;
    this.containerRightClicked = container;
    return false;
  }

  async onItemContextMenuOptionSelect(option:ItemContextMenuOptionsEnum){
    this.showItemContextMenu = false;
    switch(option){
      case ItemContextMenuOptionsEnum.DELETE:{
        await this.httpClient.delete(this.envSv.getBE_URL()+'/containers/'+this.containerRightClicked._id).toPromise();
        this.sessionSv.refreshContainers();
        break;
      }
      case ItemContextMenuOptionsEnum.EDIT:{
        const dialogRef = this.dialog.open(GenericDialogComponent, {
          width: '80vw',
          data: {title:"Edit Container "+this.containerRightClicked.name, value:this.containerRightClicked}
        });
    
        dialogRef.afterClosed().subscribe(async result => {
          if(result != null){
            result = Object.assign(this.containerRightClicked,result)
            await this.httpClient.put(this.envSv.getBE_URL()+'/containers/'+this.containerRightClicked._id,this.containerRightClicked).toPromise();
            this.sessionSv.refreshContainers();
          }
        });
      }
    }
  }

  hideContextMenu(){this.showItemContextMenu = false}
}
