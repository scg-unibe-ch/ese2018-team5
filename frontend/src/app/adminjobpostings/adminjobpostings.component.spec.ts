import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminjobpostingsComponent } from './adminjobpostings.component';

describe('AdminjobpostingsComponent', () => {
  let component: AdminjobpostingsComponent;
  let fixture: ComponentFixture<AdminjobpostingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminjobpostingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminjobpostingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
