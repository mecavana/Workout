import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit, OnChanges {
  ipAddr = GlobalComponent.ipAddr;
  @Input() event!: Event;
  workoutName = '';
  workoutDate = '';
  weight = '';
  reps = '';
  sets = '';
  restype = '';
  addWorkoutData = JSON;
  resistanceTypes = ["Barbell", "Dumbbell", "Kettlebell", "Body Weight", "Bands", "Ankle Weights", "Pulley", "Other"];
  returnWorkouts: any[] = [];
  curUser = '';
  allUsers: string[] = [];


  constructor(private httpClient: HttpClient, public fb: FormBuilder) {
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
    this.httpClient.get('http://' + this.ipAddr + ':5000/addNewWorkout?Date=' + this.workoutDate + '&Workout=' + this.workoutName + '&Weight=' + this.weight + '&Reps=' + this.reps + '&Sets=' + this.sets + '&Resistance Type=' + this.restype + '&User=' + this.curUser).subscribe(data => {
      this.addWorkoutData = data as JSON;
    })
    alert("Workout added!");
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      let curVal = change.currentValue;
      console.log('curval ' + curVal)
      if (propName === 'event') {
        this.allUsers.push(curVal);
        this.curUser = curVal;
      }
      console.log("cur user " + this.curUser)

    }
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllUniqueWorkouts').subscribe((response) => {
      this.returnWorkouts = response as any[];

    })
  }

}
