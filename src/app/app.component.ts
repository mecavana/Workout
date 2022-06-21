import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Workouts';
  author = 'Marissa';
  bodyParts: any[];
  exHistory: any[];
  clickedOnPart!: any[];
  exercise!: string;

  showWorkoutType(item: any) {
    this.clickedOnPart = item.workouts;
  }

  showWorkout(ex: string) {
    this.exercise = ex;
  }

  constructor() {
    this.bodyParts = [{ "body": "legs", "workouts": ["deadlift", "squats"] }, { "body": "arms", "workouts": ["curls", "pull ups"] }, {"body": "core", "workouts": ["crunches", "plank"]}];
    this.exHistory = [{ "workout": "squats", "date": '06/21/2022', "weight": "100", "reps": "3", "resistanceType": "barbell"}]
  }

}
