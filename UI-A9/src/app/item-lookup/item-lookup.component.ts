import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
import { UtilService } from '../services/util.service';
import { ItemLookupService } from '../services/item-lookup.service';
import { Item } from '../data-model/item';
import { MatDialog } from '@angular/material/dialog';
import { ObjectEditorDialogComponent } from '../object-editor-dialog/object-editor-dialog.component';
import { HttpClient } from '@angular/common/http';
import { SERVICES } from '../interceptors/base-url-interceptor.service';

@Component({
  selector: 'app-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.css','../app.component.css']
})
export class ItemLookupComponent implements OnInit {

  itemStore:{};
  lookupText = "";
  itemSelected;

  constructor(public sessionSv:SessionService, public utilSv:UtilService, public itemLookupSv:ItemLookupService,
    public dialog:MatDialog, public httpClient:HttpClient) {
    sessionSv.getItemHistory().subscribe((iS=>{this.itemStore = iS}))
  }

  ngOnInit(): void {
  }

  handleItemClick(item){
    this.itemLookupSv.onItemPicked.emit(item);
  }

  ngOnDestroy(){
    this.itemLookupSv.onItemPicked.observers.map(sub=>{sub.complete()});
  }

  handleAddItem(){
    const dialogRef = this.dialog.open(
      ObjectEditorDialogComponent,
      {
        width: '30vw', 
        data:{
          title: 'New Item',
          value:{
            name:{formLabel:"Name", required: true},
            lifetime:{value:10, formLabel:"Life time (days)"}
          }
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      const item = {name:result.name, lifetime: result.lifetime};
      this.httpClient.post('/items',item, {headers: {service: SERVICES.BACKEND}})
        .toPromise()
        .then( item => this.sessionSv.setItemHistory({...this.itemStore, [item['_id']]:item}))
        .catch(err => console.error(err))
    })

  }

}
