import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData{
  title:string;
  value:any;
}

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  getType(variable){
    return typeof variable;
  }

  trackByFn(index: any, item: any) {
    return index;
 }

}
