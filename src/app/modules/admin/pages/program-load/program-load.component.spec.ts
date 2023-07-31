import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramLoadComponent } from './program-load.component';

describe('ProgramLoadComponent', () => {
  let component: ProgramLoadComponent;
  let fixture: ComponentFixture<ProgramLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramLoadComponent]
    });
    fixture = TestBed.createComponent(ProgramLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
