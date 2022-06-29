import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyPartsComponent } from './body-parts/body-parts.component';
import { ResistanceComponent } from './resistance/resistance.component';
import { WorkouthistoryComponent } from './workouthistory/workouthistory.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { UsersComponent } from './users/users.component'


const routes: Routes = [
  { path: 'body-part', component: BodyPartsComponent },
  { path: 'resistance', component: ResistanceComponent },
  { path: 'workout-history', component: WorkouthistoryComponent },
  { path: 'add-workout', component: AddWorkoutComponent },
  { path: 'users', component: UsersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
