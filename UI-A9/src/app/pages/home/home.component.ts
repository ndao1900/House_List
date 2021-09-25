import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ObjectEditorDialogComponent } from '../../object-editor-dialog/object-editor-dialog.component'
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { User } from '../../data-model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css']
})
export class HomeComponent implements OnInit {
  user:User;
  hideFields = ['CONTAINER'];

  constructor(public sessionSv:SessionService, private dialog:MatDialog, private apiSv:ApiService, private router:Router) {
    sessionSv.getUser().subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

  onAddContainerClick(){
    // const dialogRef = this.dialog.open(ObjectEditorDialogComponent,
    //    {width: '30vw', 
    //    data:{title: 'Add Container', values:{'name':''}}
    //   }
    // )

    // dialogRef.afterClosed().subscribe(async container => {
    //   if(!!container){
    //     this.apiSv.addContainer(container)
    //   }
    // });
  }

  handleContainerSelect(containerId){
    this.router.navigate([`/container/${containerId}`]);
  }

}
