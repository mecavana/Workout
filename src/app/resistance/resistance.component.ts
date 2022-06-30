import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';


@Component({
  selector: 'app-resistance',
  templateUrl: './resistance.component.html',
  styleUrls: ['./resistance.component.css']
})
export class ResistanceComponent implements OnInit, OnChanges {
  ipAddr = GlobalComponent.ipAddr;
  resistanceTypes = GlobalComponent.resistanceTypes;
  bodyParts = GlobalComponent.bodyParts;
  @Input() event!: Event;
  selected = '';
  selectedWorkout = '';
  selectedResistance = '';

  returnWorkoutsByResistance: any[] = [];
  returnHistoryByWorkout: any[] = [];
  workoutHistory = '';
  curUser = '';
  allUsers: string[] = [];


  constructor(private httpClient: HttpClient) {
    
  }



  showWorkoutType(resistance: any) {
    this.returnWorkoutsByResistance = [];
    this.selected = resistance.target.value;
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
    this.httpClient.get('http://' + this.ipAddr + ':5000/getMyWorkoutsByResistanceAndPart?Workout%20Name=' + this.selectedWorkout + '&Resistance=' + this.selected + '&User=' + this.curUser).subscribe(workoutHistory => {
      this.returnHistoryByWorkout = workoutHistory as any[];
      console.log(this.returnHistoryByWorkout);
    })
    console.log('user ' + this.curUser);
  }

  ngOnInit() {

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
    this.returnHistoryByWorkout = [];
    this.returnWorkoutsByResistance = [];
    this.selected = '';
    this.selectedWorkout = '';
  }



}
