import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  
  itemSearchTerm = "";
  @Input() items =  [{name:'banana', quantity:3},{name:'apple', quantity:3}]
  @Input() name = "cont1"
  @Input() highlight = {}
  @Output() onItemSelect = new EventEmitter<string>()
  

  constructor() { }

  ngOnInit(): void {
  }

  onItemClick(name){
    this.onItemSelect.emit(name);
  }

}
