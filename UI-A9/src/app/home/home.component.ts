import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { GenericInputPanelService } from '../services/generic-input-panel.service';
import { MatDialog } from '@angular/material/dialog';
import { ObjectEditorDialogComponent } from '../object-editor-dialog/object-editor-dialog.component'
import { Container } from '../data-model/container';
import { HttpClient } from '@angular/common/http';
import { EnvService } from '../services/env.service';
import { SERVICES } from '../interceptors/base-url-interceptor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
  containerMap = {}

  constructor(public sessionSv:SessionService, public gpSv:GenericInputPanelService, private dialog:MatDialog,
    private httpClient:HttpClient, private envSv:EnvService) {
    sessionSv.getContainerMap().subscribe(cMap => this.containerMap = cMap)
  }

  ngOnInit(): void {
  }

  onAddContainerClick(){
    const dialogRef = this.dialog.open(ObjectEditorDialogComponent,
       {width: '80vw', 
       data:{title: 'Add Container', value:{'name':''}}
      }
    )

    dialogRef.afterClosed().subscribe(async result => {
      if(result != null){
        result; 
        await this.httpClient.post(
          '/containers/'+this.sessionSv.user.value['_id'],
          {...result},
          {headers: {service: SERVICES.BACKEND}}
        ).toPromise();
        this.sessionSv.getUserData();
      }
    });
    
  }

}
