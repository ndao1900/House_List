import { Component, OnInit, Input } from '@angular/core';
import { GenericInputPanelService } from '../services/generic-input-panel.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-generic-input-panel',
  templateUrl: './generic-input-panel.component.html',
  styleUrls: ['./generic-input-panel.component.css','../app.component.css']
})
export class GenericInputPanelComponent implements OnInit {

  @Input() input = {title:'',toEdit:{}}
  toEdit;
  labelTypes = {}

  constructor(private genericInpPnlSv:GenericInputPanelService, public utilSv:UtilService) {
  
   }

  ngOnInit(): void {
    this.toEdit = Object.assign({},this.input.toEdit)
    for(let label in this.toEdit){
      this.labelTypes[label] = this.utilSv.getInputType(this.toEdit[label]);
    }
  }

  handleAction(action:string){
      this.genericInpPnlSv.onActionTaken.emit({'action':action,'ret':this.toEdit})
  }

}
