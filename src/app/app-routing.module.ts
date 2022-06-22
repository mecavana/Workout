import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyPartsComponent } from './body-parts/body-parts.component';
import { ResistanceComponent } from './resistance/resistance.component';
import { WorkouthistoryComponent } from './workouthistory/workouthistory.component';


const routes: Routes = [
  { path: 'body-part', component: BodyPartsComponent },
  { path: 'resistance', component: ResistanceComponent },
  { path: 'workout-history', component: WorkouthistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
