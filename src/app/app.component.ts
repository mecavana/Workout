import { Component } from '@angular/core';
import { GlobalComponent } from './global-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Workouts';
  author = 'Marissa';
}
