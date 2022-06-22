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
  selectedResistance = '';
  selectedWorkout = '';
  resistanceTypes: any[];
  returnWorkoutsByResistance: any[] = [];
  returnHistoryByWorkout: any[] = [];
  workoutHistory = '';;

  constructor(private httpClient: HttpClient) {
    this.resistanceTypes = ["Barbell", "Dumbbell", "Kettlebell", "Body Weight", "Bands", "Ankle Weights", "Pulley", "Other"]
  }

  showWorkoutType(item: any) {
    this.returnWorkoutsByResistance = [];
    this.selectedResistance = item;
    console.log(this.selectedResistance);
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkoutsByResistance?Resistance=' + this.selectedResistance).subscribe(workoutData => {
      this.returnWorkoutsByResistance = workoutData as any[];
      console.log(this.returnWorkoutsByResistance);
    })
  }

  getHistoryByBodyPart(workout: any, resistance: any) {
    this.returnHistoryByWorkout = [];
    this.selectedResistance = resistance;
    this.selectedWorkout = workout;
    console.log(this.selectedWorkout);
    this.httpClient.get('http://' + this.ipAddr + ':5000/getMyWorkoutsByResistanceAndPart?Workout%20Name=' + this.selectedWorkout + '&Resistance=' + this.selectedResistance).subscribe(workoutHistory => {
      this.returnHistoryByWorkout = workoutHistory as any[];
      console.log(this.returnHistoryByWorkout);
    })

  }

  ngOnInit(): void {
  }

}
