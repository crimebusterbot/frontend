import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutestepsComponent } from './routesteps.component';

describe('RoutestepsComponent', () => {
  let component: RoutestepsComponent;
  let fixture: ComponentFixture<RoutestepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutestepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutestepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
