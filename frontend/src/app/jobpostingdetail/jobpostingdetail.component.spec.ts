import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpostingdetailComponent } from './jobpostingdetail.component';

describe('JobpostingdetailComponent', () => {
  let component: JobpostingdetailComponent;
  let fixture: ComponentFixture<JobpostingdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobpostingdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpostingdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
