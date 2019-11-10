import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ContainerComponent } from './container/container.component';
import { EditContainerComponent } from './edit-container/edit-container.component';


const routes: Routes = [
  { path: '', redirectTo:'/Home',pathMatch:'full'},
  { path: 'Home',component:HomeComponent},
  { path: 'EditContainer', component:EditContainerComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule {

 }
