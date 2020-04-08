import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditContainerLayoutComponent } from './edit-container-layout/edit-container-layout.component';
import { GridsterModule } from 'angular-gridster2';
import { GridCustomItemComponent } from './grid-custom-item/grid-custom-item.component';
import { EditGridItemPanelComponent } from './edit-grid-item-panel/edit-grid-item-panel.component';
import { ContainerComponent } from './container/container.component';
import { ItemComponent } from './item/item.component';
import { ItemsListComponent } from './items-list/items-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EditContainerLayoutComponent,
    GridCustomItemComponent,
    EditGridItemPanelComponent,
    ContainerComponent,
    ItemComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
