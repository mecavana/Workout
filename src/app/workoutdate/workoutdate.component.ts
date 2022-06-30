import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-workoutdate',
  templateUrl: './workoutdate.component.html',
  styleUrls: ['./workoutdate.component.css']
})
export class WorkoutdateComponent implements OnInit, OnChanges {
  ipAddr = GlobalComponent.ipAddr;
  @Input() event!: Event;
  workoutDate = '';
  curUser = '';
  returnWorkouts: any[] = [];
  allUsers: string[] = [];

  constructor(private httpClient: HttpClient, public fb: FormBuilder) { }

  addWorkoutForm = this.fb.group({
    date: [''],
  })

  onSubmit() {
    this.workoutDate = this.addWorkoutForm.value.date;
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkoutsByDateUser?Date=' + this.workoutDate + '&User=' + this.curUser).subscribe((response) => {
      this.returnWorkouts = response as any[];
      console.log(response)
    })
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
    this.returnWorkouts = [];

  }

}
