import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BodyPartsComponent } from './body-parts/body-parts.component';
import { ResistanceComponent } from './resistance/resistance.component';
import { WorkouthistoryComponent } from './workouthistory/workouthistory.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyPartsComponent,
    ResistanceComponent,
    WorkouthistoryComponent,
    AddWorkoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
