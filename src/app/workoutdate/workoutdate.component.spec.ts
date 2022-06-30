import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutdateComponent } from './workoutdate.component';

describe('WorkoutdateComponent', () => {
  let component: WorkoutdateComponent;
  let fixture: ComponentFixture<WorkoutdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
