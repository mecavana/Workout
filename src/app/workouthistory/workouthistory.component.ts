import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';

@Component({
  selector: 'app-workouthistory',
  templateUrl: './workouthistory.component.html',
  styleUrls: ['./workouthistory.component.css']
})
export class WorkouthistoryComponent implements OnInit, OnChanges {
  ipAddr = GlobalComponent.ipAddr;
  @Input() event!: Event;
  returnWorkouts: any[] = [];
  curUser = '';
  allUsers: string[] = [];

  constructor(private httpClient: HttpClient) {

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
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkoutsByUser?User=' + this.curUser).subscribe((response) => {
      this.returnWorkouts = response as any[];
      console.log(response)
    })
    this.returnWorkouts = [];

  }
 


  ngOnInit(): void {
  }

}
