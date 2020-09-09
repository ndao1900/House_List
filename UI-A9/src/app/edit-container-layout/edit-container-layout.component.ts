import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterPush, GridsterComponent }  from 'angular-gridster2';
import { ActivatedRoute, UrlSegment } from '@angular/router';
@Component({
  selector: 'app-edit-container-layout',
  templateUrl: './edit-container-layout.component.html',
  styleUrls: ['./edit-container-layout.component.css']
})
export class EditContainerLayoutComponent implements OnInit {
  options: GridsterConfig;
  gridsterComp: GridsterComponent;
  @Input() editable = false;
  @Input() highlight = {};
  @Input() layout;
  @Input() fromContainer = -99;

  @Output() onContainerSelected = new EventEmitter();
  @Output() onGridClicked = new EventEmitter();

  itemEditting;
  selected = {}

  constructor(route:ActivatedRoute) {
    route.url.subscribe((url)=>{if(url.includes(new UrlSegment("EditContainerLayout",null))){this.editable=true}})
   }

  ngOnInit() {
    this.options = {
      minCols:this.layout? this.layout.size[0] : 4,
      maxCols:this.layout? this.layout.size[0] : 4,
      minRows:this.layout? this.layout.size[1] : 4,
      maxRows:this.layout? this.layout.size[1] : 4,
      gridType:'fit',
      mobileBreakpoint:0,
      displayGrid:this.editable? 'always':'none',
      fixedColWidth:100,
      fixedRowHeight:100,
      draggable: {enabled:this.editable, ignoreContent:true},
      initCallback: ((grid)=>{this.gridsterComp = grid}).bind(this),
      resizable:{enabled:this.editable},
      pushItems:true
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(!!changes.editable && !!this.options){
      this.options = {
        ...this.options,
        draggable: {enabled:this.editable, ignoreContent:true},
        displayGrid:this.editable? 'always':'none',
        resizable:{enabled:this.editable}
       }
       this.changeGridsterOption()
    }
  }

  changeGridsterOption(){
    if(this.options.api && this.options.api.optionsChanged){
      this.options.api.optionsChanged();
    }
  }

  changeGridCols(cols){
    this.options = {...this.options,maxCols:cols,minCols:cols}
    this.changeGridsterOption()
  }
  changeGridRows(rows){
    this.options = {...this.options,maxRows:rows,minRows:rows}
    this.changeGridsterOption()
  }

  onItemSelected(index, event){
    event.stopPropagation();
    this.itemEditting = this.gridsterComp.grid[index];
    this.onContainerSelected.emit(this.layout.tiles[index])
    let contId = this.layout.tiles[index].id 
    this.selected = this.selected[contId]? {}:{[contId]:true}
  }

  pushItem(whatChanged) {
    const push = new GridsterPush(this.itemEditting); // init the service
    let pushDirection = push.fromNorth;
    switch(whatChanged){
      case 'add row':
        this.itemEditting.$item.rows += 1;
        break;
      case 'del row':
        this.itemEditting.$item.rows -= 1;
        break;
      case 'add col':
        this.itemEditting.$item.cols += 1;
        pushDirection = push.fromWest;
        break;
      case 'del col':
        this.itemEditting.$item.cols -= 1;
        pushDirection = push.fromWest;
        break;
    }
    
    push.checkPushBack(); // check for items can restore to original position
    push.setPushedItems(); // save the items pushed
    this.itemEditting.setSize();
    this.itemEditting.checkItemChanges(this.itemEditting.$item, this.itemEditting.item);
    
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  onGridClick(event){
    event.stopPropagation();
    this.onGridClicked.emit();
    this.selected = {}
  }
}
