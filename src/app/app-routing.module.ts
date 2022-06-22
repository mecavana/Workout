import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyPartsComponent } from './body-parts/body-parts.component';

const routes: Routes = [
  { path: 'body-part', component: BodyPartsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
