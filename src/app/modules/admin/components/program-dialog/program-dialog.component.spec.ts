import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDialogComponent } from './program-dialog.component';

describe('ProgramDialogComponent', () => {
  let component: ProgramDialogComponent;
  let fixture: ComponentFixture<ProgramDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramDialogComponent]
    });
    fixture = TestBed.createComponent(ProgramDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
