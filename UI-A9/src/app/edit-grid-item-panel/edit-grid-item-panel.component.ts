import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-grid-item-panel',
  templateUrl: './edit-grid-item-panel.component.html',
  styleUrls: ['./edit-grid-item-panel.component.css']
})
export class EditGridItemPanelComponent implements OnInit {

  @Output() onChoiceSelected = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick(whichOne){
    this.onChoiceSelected.emit(whichOne)
  }

}
