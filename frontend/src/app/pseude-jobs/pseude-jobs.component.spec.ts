import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudeJobsComponent } from './pseude-jobs.component';

describe('PseudeJobsComponent', () => {
  let component: PseudeJobsComponent;
  let fixture: ComponentFixture<PseudeJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PseudeJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PseudeJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
