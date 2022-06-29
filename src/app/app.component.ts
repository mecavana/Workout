import { Component, Input } from '@angular/core';
import { GlobalComponent } from './global-component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GlobalComponent.title;
  ipAddr = GlobalComponent.ipAddr;
  links = ['add-workout', 'workout-history', 'body-part', 'resistance'];
  link = '';
  activeLink = '';

  public clickedEvent!: Event;

  constructor(public route: ActivatedRoute, public router: Router) {
    console.log("route.url" + this.route.url);

  }



  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }

  setTab(tabname: string) {
    this.router.navigate([`/${tabname}`]);
    console.log("router.url " + this.router.url);
  }
}
