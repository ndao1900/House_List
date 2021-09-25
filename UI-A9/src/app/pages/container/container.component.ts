import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { FloatingPanelContentEnum } from '../../enums/floating-panel-content'
import { MatDialog } from '@angular/material/dialog';
import { ObjectEditorDialogComponent } from '../../object-editor-dialog/object-editor-dialog.component';
import { ItemLookupService } from '../../services/item-lookup.service';
import { HttpClient } from '@angular/common/http';
import { SERVICES } from '../../interceptors/base-url-interceptor.service'
import { Container } from '../../data-model/container';
// import { ItemLookupComponent } from '../item-lookup/item-lookup.component';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() mainContainer

  selectedContainer:Container;
  containerHighlightSelected = {};
  containerHighlightHover = {}
  isEdittingLayout = false;
  containerMap = {}
  
  itemLkpSub;
  genericInpPnlSub;
  itemToAdd;

  constructor(public utilSv:UtilService, public activatedRoute:ActivatedRoute, public sessionSv:SessionService,
    private dialog:MatDialog, private itemLkpSv:ItemLookupService, public httpClient:HttpClient,
    private apiSv:ApiService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const nameFromRoute = params['name'];
      if(!!nameFromRoute){
        const sub = this.sessionSv.getUser().subscribe(user => {
          if(!!user){
            this.mainContainer = user.containers[nameFromRoute.toUpperCase()];
            this.selectedContainer = this.mainContainer;
          }
        })
      }
    });
  }

//   handleItemSelect(itemSelected){
//     this.addContainerHighlight(itemSelected,this.containerHighlightSelected)
//   }

//   handleItemHover(itemHovered){
//     this.addContainerHighlight(itemHovered,this.containerHighlightHover)
//   }

//   addContainerHighlight(item,map){
//     for(let itemId in item){
//       if(map[itemId] != undefined){
//         if(Object.keys(item[itemId]).length > 1){
//           if(this.utilSv.isAllTrue(item[itemId])){
//             this.utilSv.setAll(map[itemId],!this.utilSv.isAllTrue(map[itemId]))
//           }
//           else{
//             for(let contId in item[itemId])
//               this.addContainerHighlight({[itemId]:{[contId]:item[itemId][contId]}},map)
//           }
//         }
//         else{
//           for(let contId in item[itemId]){
//             if(item[itemId][contId]){
//               map[itemId][contId] = !map[itemId][contId]
//             }
//           }
//         }
//       }else{
//         map[itemId] = item[itemId]
//       }
//     }
//   }

  getHighlightedContainers(){
    let selectedContainers = {}
    let maps = [this.containerHighlightHover, this.containerHighlightSelected]
    for( let i in maps){
      for(let id in maps[i]){
        for(let contId in maps[i][id]){
          selectedContainers[contId] = selectedContainers[contId] || maps[i][id][contId]
        }
      }
    }
    return selectedContainers
  }

  onContainerSelected(container){
    if(this.selectedContainer._id != container._id)
      this.selectedContainer = container
    else
      this.selectedContainer = this.mainContainer
  }

  getItemsMap(container){
    let allItems = {}
    if(container.items){
      Object.keys(container.items).map((itemId)=>{
        const itemQty = container.items[itemId]
        allItems[itemId] = {...itemQty.item, container:{[container.name]:itemQty.quantity}, total: itemQty.quantity}  
      });
    }
    if(container.layout && container.layout.tiles){
      container.layout.tiles.map(tile=>{
        Object.keys(tile.items).map( (itemId)=>{
          const itemQty = tile.items[itemId];
          if(allItems[itemId]){
            allItems[itemId].container[tile.name] = itemQty.quantity;
            allItems[itemId].total += itemQty.quantity; 
          }
          else{
            allItems[itemId] = {...itemQty.item, container:{[container.name]:itemQty.quantity}, total: itemQty.quantity}
          }
        })
      })
    }
    return allItems;
  }

  onGridClicked(){
    this.selectedContainer = this.mainContainer
  }

//   onAddItem(){
//     const itemLookupDialogRef = this.dialog.open(
//       ItemLookupComponent
//     )
//     itemLookupDialogRef.afterClosed().subscribe(item => {
//       if(!!item)
//         this.handleItemAdd(item);
//     })
//   }

  handleItemAdd(item){
    this.itemToAdd = item;

    const dialogRef = this.dialog.open(
      ObjectEditorDialogComponent,
      {
        width: '30vw', 
        data:{title: 'Item Quantity', values:{'quantity':''}}
      }
    )

    // dialogRef.afterClosed().subscribe(async result => {
    //   if(result != null){
    //     const qty = parseInt(result.quantity);
    //     this.apiSv.addItemToContainer(this.selectedContainer._id, this.itemToAdd._id, qty);
    //   }
    // });
  }

//   handleQuantityChange(quantityChange){
//     this.apiSv.addItemQuantity(quantityChange)
//   }         
}
