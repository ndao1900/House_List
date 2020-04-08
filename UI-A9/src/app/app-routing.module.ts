import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditContainerLayoutComponent } from './edit-container-layout/edit-container-layout.component';


const routes: Routes = [
  { path: 'EditContainerLayout', component:EditContainerLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
