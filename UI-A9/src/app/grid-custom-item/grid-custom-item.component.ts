import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-custom-item',
  templateUrl: './grid-custom-item.component.html',
  styleUrls: ['./grid-custom-item.component.css', '../app.component.css']
})
export class GridCustomItemComponent implements OnInit {

  selected = false;
  @Input() name = ''
  @Input() isHighlight = false;
  @Input() isDragable = false;
  @Input() isSelected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
