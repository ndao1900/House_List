import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditContainerLayoutComponent } from './edit-container-layout/edit-container-layout.component';
import { GridsterModule } from 'angular-gridster2';
import { GridCustomItemComponent } from './grid-custom-item/grid-custom-item.component';
import { EditGridItemPanelComponent } from './edit-grid-item-panel/edit-grid-item-panel.component';
import { ContainerComponent } from './container/container.component';
import { ItemListEntryComponent } from './items-list/item-list-entry/item-list-entry.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemLookupComponent } from './item-lookup/item-lookup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ObjectEditorDialogComponent } from './object-editor-dialog/object-editor-dialog.component';
import { BaseUrlInterceptorService } from './interceptors/base-url-interceptor.service';
import { ItemListEntryRowComponent } from './items-list/item-list-entry/item-list-entry-row/item-list-entry-row.component'

@NgModule({
  declarations: [
    AppComponent,
    EditContainerLayoutComponent,
    GridCustomItemComponent,
    EditGridItemPanelComponent,
    ContainerComponent,
    ItemListEntryComponent,
    ItemsListComponent,
    ItemLookupComponent,
    HomeComponent,
    ObjectEditorDialogComponent,
    ItemListEntryRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
