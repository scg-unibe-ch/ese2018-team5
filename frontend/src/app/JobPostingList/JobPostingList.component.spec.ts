import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingListComponent } from './JobPostingList.component';

describe('JobPostingListComponent', () => {
  let component: JobPostingListComponent;
  let fixture: ComponentFixture<JobPostingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
