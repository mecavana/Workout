import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalComponent } from '.././global-component';

@Component({
  selector: 'app-workouthistory',
  templateUrl: './workouthistory.component.html',
  styleUrls: ['./workouthistory.component.css']
})
export class WorkouthistoryComponent implements OnInit {
  ipAddr = GlobalComponent.ipAddr;
  returnWorkouts: any[] = [];
  constructor(private httpClient: HttpClient) {
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkouts').subscribe((response) => {
      this.returnWorkouts = response as any[];
      console.log(response)
    })
  }


 


  ngOnInit(): void {
  }

}
