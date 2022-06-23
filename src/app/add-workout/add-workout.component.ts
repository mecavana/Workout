import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit {
  ipAddr = GlobalComponent.ipAddr;
  workoutName = '';
  workoutDate = '';
  weight = '';
  reps = '';
  sets = '';
  restype = '';
  addWorkoutData = JSON;
  resistanceTypes: any[];
  returnWorkouts: any[] = [];


  constructor(private httpClient: HttpClient, public fb: FormBuilder) {
    this.resistanceTypes = ["Barbell", "Dumbbell", "Kettlebell", "Body Weight", "Bands", "Ankle Weights", "Pulley", "Other"];
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllUniqueWorkouts').subscribe((response) => {
      this.returnWorkouts = response as any[];

    })

  }

  addWorkoutForm = this.fb.group({
    date: [''],
    name: [''],
    weight: [''],
    reps: [''],
    sets: [''],
    res: [''],

  })


  onSubmit() {
    this.workoutDate = this.addWorkoutForm.value.date;
    this.workoutName = this.addWorkoutForm.value.name;
    this.weight = this.addWorkoutForm.value.weight;
    this.reps = this.addWorkoutForm.value.reps;
    this.sets = this.addWorkoutForm.value.sets;
    this.restype = this.addWorkoutForm.value.res;
    this.httpClient.get('http://' + this.ipAddr + ':5000/addNewWorkout?Date=' + this.workoutDate + '&Workout=' + this.workoutName + '&Weight=' + this.weight + '&Reps=' + this.reps + '&Sets=' + this.sets + '&Resistance Type=' + this.restype).subscribe(data => {
      this.addWorkoutData = data as JSON;
    })
    alert("Workout added!");
  }
  ngOnInit(): void {
  }

}
