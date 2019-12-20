import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreationComponent } from './business-creation.component';

describe('BusinessCreationComponent', () => {
  let component: BusinessCreationComponent;
  let fixture: ComponentFixture<BusinessCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
