import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalComponent } from '.././global-component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  allUsers = GlobalComponent.allUsers;
  title = GlobalComponent.title;
  public user: string = '';
  welcomeUser: string = '';
  public userName: string = '';

  @Output() eventClicked = new EventEmitter<Event>();

  constructor() { }

  updateUser(user: string) {
    this.userName = user;
    this.welcomeUser = ', ' + user;
    console.log(this.userName);
  }


  onClick(event: Event): void {
    this.eventClicked.emit(event);
  }



  ngOnInit(): void {
  }

}
