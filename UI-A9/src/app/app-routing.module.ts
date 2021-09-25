import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './pages/container/container.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: 'container/:name', component:ContainerComponent},
  { path: '', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
