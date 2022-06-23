import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';

@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.css']
})
export class ResistanceComponent implements OnInit {
  ipAddr = GlobalComponent.ipAddr;
  selected = '';
  selectedWorkout = '';
  selectedResistance = '';
  resistanceTypes: any[];
  returnWorkoutsByResistance: any[] = [];
  returnHistoryByWorkout: any[] = [];
  workoutHistory = '';;

  constructor(private httpClient: HttpClient) {
    this.resistanceTypes = ["Barbell", "Dumbbell", "Kettlebell", "Body Weight", "Bands", "Ankle Weights", "Pulley", "Other"]
  }

  showWorkoutType(event: any) {
    this.returnWorkoutsByResistance = [];
    this.selected = event.target.value;
    console.log(this.selected);
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkoutsByResistance?Resistance=' + this.selected).subscribe(workoutData => {
      this.returnWorkoutsByResistance = workoutData as any[];
      console.log(this.returnWorkoutsByResistance);
    })
  }

  getHistoryByBodyPart(workout: any) {
    this.returnHistoryByWorkout = [];
    this.selectedWorkout = workout.target.value;
    console.log(this.selectedWorkout);
    this.httpClient.get('http://' + this.ipAddr + ':5000/getMyWorkoutsByResistanceAndPart?Workout%20Name=' + this.selectedWorkout + '&Resistance=' + this.selected).subscribe(workoutHistory => {
      this.returnHistoryByWorkout = workoutHistory as any[];
      console.log(this.returnHistoryByWorkout);
    })

  }

  ngOnInit(): void {
  }

}
