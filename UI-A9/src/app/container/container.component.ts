import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../services/util.service';
import { iif, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() container = {
    id:'cont1',
    name:"cont1",
    items:[{name:'banana', quantity:3, container:'cont1'},{name:'bread', quantity:3,container:'cont1'}],
    layout:{
      tiles:[
        {name:'cont2', items:[{name:'bread', quantity:3,container:'cont2'},{name:'veggie', quantity:3,container:'cont2'}],
          x:0,y:0,cols:2,rows:2},
        {name:'cont3', items:[{name:'cake', quantity:3,container:'cont3'}],
          x:3,y:2,cols:1,rows:2},
      ],
      size:[4,4] 
    }
  }

  allItems = {}
  itemSelected = new BehaviorSubject({});
  highlightContainers = {}

  constructor(public utilSv:UtilService) {
    this.itemSelected.subscribe(val=>{
      let itemNames = Object.keys(val);
      this.highlightContainers = {}
      itemNames.map(name=>{
        if(val[name]){
          let item = this.allItems[name];
          Object.assign(this.highlightContainers, item.container)
        }
      })
    })
   }

  ngOnInit(): void {
    this.container.items.map((item)=>{this.addItemtoMap(item)})

    this.container.layout.tiles.map(tile=>{
      tile.items.map((item)=>{
        this.addItemtoMap(item)}
      )
    })
  }

  addItemtoMap(item){
    let name = item.name;
    if(!this.allItems[name]){
      this.allItems[name] = {...item,container:{[item.container]:1}};  
    }else{
      this.allItems[name].quantity += item.quantity;
      this.allItems[name].container[item.container] = 1 
    }
  }

  onItemSelect(name){
    let nextState = this.itemSelected.value;
    nextState[name] = !nextState[name];
    this.itemSelected.next(nextState)
  }

  editItem(){

  }

}
