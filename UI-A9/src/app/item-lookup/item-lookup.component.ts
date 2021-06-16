// import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
// import { SessionService } from '../services/session.service';
// import { UtilService } from '../services/util.service';
// import { ItemLookupService } from '../services/item-lookup.service';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ObjectEditorDialogComponent } from '../object-editor-dialog/object-editor-dialog.component';
// import { HttpClient } from '@angular/common/http';
// import { SERVICES } from '../interceptors/base-url-interceptor.service';
// import { ApiService } from '../services/api.service';

// interface DialogData {

// }
// @Component({
//   selector: 'app-item-lookup',
//   templateUrl: './item-lookup.component.html',
//   styleUrls: ['./item-lookup.component.css','../app.component.css']
// })
// export class ItemLookupComponent implements OnInit {

//   itemStore:{};
//   lookupText = "";
//   itemSelected;
//   userId;

//   constructor(public sessionSv:SessionService, public utilSv:UtilService, public itemLookupSv:ItemLookupService,
//     public dialogRef: MatDialogRef<ItemLookupComponent>, private apiService:ApiService,
//     @Inject(MAT_DIALOG_DATA) public data:DialogData, public dialog:MatDialog
//   ) {
//     sessionSv.getItemHistory().subscribe((iS=>{this.itemStore = iS}))
//     sessionSv.getUser().subscribe(user => {this.userId = user._id})
//   }

//   ngOnInit(): void {
//   }

//   handleItemClick(item){
//     this.dialogRef.close(item);
//   }

//   ngOnDestroy(){
//     this.itemLookupSv.onItemPicked.observers.map(sub=>{sub.complete()});
//   }

// }
