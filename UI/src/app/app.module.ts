import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import { ItemComponent } from './item/item.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EditContainerComponent } from './edit-container/edit-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http'

import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
import { ItemContextMenuComponent } from './container/item-context-menu/item-context-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ItemComponent,
    HomeComponent,
    EditContainerComponent,
    GenericDialogComponent,
    ItemContextMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  entryComponents: [
    GenericDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
