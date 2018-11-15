import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpostingeditComponent } from './jobpostingedit.component';

describe('JobpostingeditComponent', () => {
  let component: JobpostingeditComponent;
  let fixture: ComponentFixture<JobpostingeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpostingeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpostingeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
