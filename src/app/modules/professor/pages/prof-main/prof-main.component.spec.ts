import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfMainComponent } from './prof-main.component';

describe('ProfMainComponent', () => {
  let component: ProfMainComponent;
  let fixture: ComponentFixture<ProfMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfMainComponent]
    });
    fixture = TestBed.createComponent(ProfMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
