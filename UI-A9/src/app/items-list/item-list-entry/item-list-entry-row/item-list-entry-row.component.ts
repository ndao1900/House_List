import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-item-list-entry-row',
  templateUrl: './item-list-entry-row.component.html',
  styleUrls: ['./item-list-entry-row.component.css', '../../../app.component.css']
})
export class ItemListEntryRowComponent implements OnInit {

  @Input() canExpand:boolean;
  @Input() itemName?:string;
  @Input() quantity?:number;
  @Input() canInteract?:boolean = false;
  @Input() containerName?:string;
  @Input() daysLeft?:number;
  @Input() gridStyle={}
  @Input() displayColumns = []

  @Output() onExpand = new EventEmitter();
  @Output() onQtyChange = new EventEmitter();

  expanded:boolean = false;

  constructor(private sessionSv:SessionService) { }

  ngOnInit(): void {
  }

  handleExpand(){
    this.expanded = !this.expanded;
    this.onExpand.emit();
  }

  handleQuantityChange(event, amount){
    event.stopPropagation();
    this.onQtyChange.emit(amount);
  }

  getProgress(){
    if (this.daysLeft < 0) return "2";
    if (this.daysLeft > this.sessionSv.getItem(this.itemName).lifetime) return "100";
    return (((1.0*this.daysLeft) / this.sessionSv.getItem(this.itemName).lifetime) *100).toString()
  }

  getProgressStyle(){
    const progress = parseFloat(this.getProgress());
    const color = progress > 50? "green" : (progress > 20? "orange" : "red");
    return {
      "opacity": 0.5,
      "background-color": color
    }
  }

}
