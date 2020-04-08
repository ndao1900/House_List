import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-container-layout',
  templateUrl: './edit-container-layout.component.html',
  styleUrls: ['./edit-container-layout.component.css']
})
export class EditContainerLayoutComponent implements OnInit {

  @Input() layout = {tiles:[
      {name:'cont1', items:['meh','tu'],x:0,y:0,cols:2,rows:2},
      {name:'cont2', items:['meh','tu'],x:3,y:3,cols:1,rows:2},
    ],
    size:[4,4]
  }

  style = {display:'grid',height:'90vh',width:'90vh'};
  tileStyle = {height: '100%', border:'1px solid black'}
  cornerArea = this.layout.size[1].toString()+'/'
                +this.layout.size[0].toString()+'/'
                +(this.layout.size[1]+1).toString()+'/'
                +(this.layout.size[0]+1).toString()

  constructor() { }

  ngOnInit() {
    this.style['grid-template-columns'] = 'auto '.repeat(this.layout.size[0])
    this.style['grid-template-columns'] = 'auto '.repeat(this.layout.size[1])
  }

  getTileStype(tile){
    let newX = tile.x < this.layout.size[0]? tile.x:this.layout.size[0]-1;
    let newY = tile.y < this.layout.size[1]? tile.y:this.layout.size[1]-1;
    let colsOverFlow = (newX+tile.cols)-this.layout.size[0]
    let newCols = tile.cols - (colsOverFlow > 0? colsOverFlow:0);
    let rowsOverFlow = (newY+tile.rows)-this.layout.size[1]
    let newRows = tile.rows - (rowsOverFlow > 0? rowsOverFlow:0);
    
    const startCol = newX+1;
    const endCol = startCol+newCols;
    const startRow = newY+1;
    const endRow = startRow+newRows;
    return {...this.tileStyle,'grid-area': startRow.toString()+"/"+startCol.toString()+'/'+endRow.toString()+"/"+endCol.toString()}
  }
}
