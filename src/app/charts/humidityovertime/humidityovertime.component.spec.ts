import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragetrashComponent } from './averagetrash.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {DataService} from '../../_services/data.service';

describe('AveragetrashComponent', () => {
  let component: AveragetrashComponent;
  let fixture: ComponentFixture<AveragetrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AveragetrashComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [DataService]
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
