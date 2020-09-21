import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ObjectEditorDialogComponent } from '../object-editor-dialog/object-editor-dialog.component'
import { Container } from '../data-model/container';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../services/env.service';
import { SERVICES } from '../interceptors/base-url-interceptor.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  containerMap = {}

  constructor(public sessionSv:SessionService, private dialog:MatDialog, private apiSv:ApiService) {
    sessionSv.getContainerMap().subscribe(cMap => this.containerMap = cMap)
  }

  ngOnInit(): void {
  }

  onAddContainerClick(){
    const dialogRef = this.dialog.open(ObjectEditorDialogComponent,
       {width: '30vw', 
       data:{title: 'Add Container', values:{'name':''}}
      }
    )

    dialogRef.afterClosed().subscribe(async container => {
      if(!!container){
        this.apiSv.addContainer(container)
      }
    });
    
  }

}
