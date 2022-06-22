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
  bodyParts: any[];
  returnWorkoutsByBodyPart: any[] = [];

  constructor(private httpClient: HttpClient) {
    this.bodyParts = ["Back", "Biceps", "Chest", "Core", "Forearms", "Legs", "Shoulders", "Triceps", "Whole Body"]
  }

  showWorkoutType(item: any) {
    this.returnWorkoutsByBodyPart = [];
    this.selectedBodyPart = item;
    console.log(this.selectedBodyPart);
    this.httpClient.get('http://' + this.ipAddr + ':5000/getAllWorkoutsByBodyPart?Body%20Part=' + this.selectedBodyPart).subscribe(workoutData => {
      this.returnWorkoutsByBodyPart = workoutData as any[];
      console.log(this.returnWorkoutsByBodyPart);
    })
  }


  ngOnInit(): void {
  }

}
