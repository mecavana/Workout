import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';
import { FormBuilder } from "@angular/forms";
import { NgMultiSelectDropDownModule, IDropdownSettings  } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {
  @Input() event!: Event;
  ipAddr = GlobalComponent.ipAddr;
  resistanceTypes = GlobalComponent.resistanceTypes;
  bodyParts = GlobalComponent.bodyParts;
  workoutName = '';
  bodyPart = '';
  resistaneSelected = '';
  addWorkoutData = JSON;


  constructor(private httpClient: HttpClient, public fb: FormBuilder) { }

  addWorkoutForm = this.fb.group({
    name: [''],
    bodypart: [''],
    resistance: [''],
  })

  onSubmit() {
    this.workoutName = this.addWorkoutForm.value.name;
    this.bodyPart = this.addWorkoutForm.value.bodypart;
    this.resistaneSelected = this.addWorkoutForm.value.resistance;
    this.httpClient.get('http://' + this.ipAddr + ':5000/addNewExercise?Workout%20Name=' + this.workoutName + '&Body%20Part=' + this.bodyPart + '&Resistance=' + this.resistaneSelected).subscribe(data => {
      this.addWorkoutData = data as JSON;
    })
    alert("Workout added!");
    
    console.log(JSON.stringify(this.addWorkoutData));
  }


  ngOnInit(): void {
  }

}
