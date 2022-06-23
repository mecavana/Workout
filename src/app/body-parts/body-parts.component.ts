import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';

@Component({
  selector: 'app-body-parts',
  templateUrl: './body-parts.component.html',
  styleUrls: ['./body-parts.component.css']
})
export class BodyPartsComponent implements OnInit {
  ipAddr = GlobalComponent.ipAddr;
  selectedBodyPart = '';
  selectedWorkout = '';
  bodyParts: any[];
  returnWorkoutsByBodyPart: any[] = [];
  returnHistoryByWorkout: any[] = [];
  workoutHistory = '';
  selected = '';

  constructor(private httpClient: HttpClient) {
    this.bodyParts = ["Back", "Biceps", "Chest", "Core", "Forearms", "Legs", "Shoulders", "Triceps", "Whole Body"]
  }


  getHistoryByBodyPart(event: any) {
    this.returnHistoryByWorkout = [];
    this.selectedWorkout = event.target.value;
    console.log(this.selectedWorkout);
    this.httpClient.get('http://' + this.ipAddr + ':5000/getMyWorkoutsByName?Workout%20Name=' + this.selectedWorkout).subscribe(workoutHistory => {
      this.returnHistoryByWorkout = workoutHistory as any[];
      console.log(this.returnHistoryByWorkout);
    })
  }

  updateBodyPart(event: any) {
    this.returnWorkoutsByBodyPart = [];
    this.selected = event.target.value
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkoutsByBodyPart?Body%20Part=' + this.selected).subscribe(workoutData => {
      this.returnWorkoutsByBodyPart = workoutData as any[];
      console.log(this.returnWorkoutsByBodyPart);
    })

    }
    


  ngOnInit(): void {
  }

}
