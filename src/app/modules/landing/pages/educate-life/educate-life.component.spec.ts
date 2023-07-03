import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducateLifeComponent } from './educate-life.component';

describe('EducateLifeComponent', () => {
  let component: EducateLifeComponent;
  let fixture: ComponentFixture<EducateLifeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducateLifeComponent]
    });
    fixture = TestBed.createComponent(EducateLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
