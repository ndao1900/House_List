import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData{
  title:string;
  values:any;
}

@Component({
  selector: 'app-object-editor-dialog',
  templateUrl: './object-editor-dialog.component.html',
  styleUrls: ['./object-editor-dialog.component.css']
})
export class ObjectEditorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ObjectEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
    ) {
      const {values} = data;
      Object.keys(values).forEach(field => {
        if(typeof(values[field]) !== 'object')
        values[field] = {value: values[field], formLabel:field, required:true}
      })
    }

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

  handleConfirm() {
    const validatedValues = this.validateData();
    if(!Object.keys(validatedValues).some(field => !!validatedValues[field].error))
      this.dialogRef.close(this.getReturn(validatedValues))
    else{
      this.data.values = validatedValues;
    }
  }

  validateData():boolean {
    const {values: value} = this.data;
    Object.keys(value).forEach(
      field => {
        if(value[field].required && !value[field].value)
          value[field].error = 'Is required'
        else
          delete value[field].error
      }
    )
    return value;
  }

  getReturn(value) {
    const newValue = {...value}
    Object.keys(newValue).forEach(field => newValue[field] = newValue[field].value)
    return newValue;
  }
}
