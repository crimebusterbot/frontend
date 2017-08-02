import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragetrashComponent } from './averagetrash.component';

describe('AveragetrashComponent', () => {
  let component: AveragetrashComponent;
  let fixture: ComponentFixture<AveragetrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveragetrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AveragetrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
