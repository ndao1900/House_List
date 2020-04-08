import { Component, OnInit, Input } from '@angular/core';
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
  @Input() highlight = {}

  @Input() layout = {tiles:[
      {name:'cont1', items:['meh','tu'],x:0,y:0,cols:2,rows:2},
      {name:'cont2', items:['meh','tu'],x:3,y:2,cols:1,rows:2},
    ],
    size:[4,4]
  }

  itemEditting;

  constructor(route:ActivatedRoute) {
    route.url.subscribe((url)=>{if(url.includes(new UrlSegment("EditContainerLayout",null))){this.editable=true}})
   }

  ngOnInit() {
    this.options = {
      minCols:this.layout.size[0],
      maxCols:this.layout.size[0],
      minRows:this.layout.size[1],
      maxRows:this.layout.size[1],
      gridType:'fit',
      mobileBreakpoint:0,
      displayGrid:'always',
      fixedColWidth:100,
      fixedRowHeight:100,
      draggable: {enabled:this.editable, ignoreContent:true},
      initCallback: ((grid)=>{this.gridsterComp = grid}).bind(this),
      resizable:{enabled:this.editable},
      pushItems:true
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

  onItemSelected(index){
    this.itemEditting = this.gridsterComp.grid[index]; 
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
}
