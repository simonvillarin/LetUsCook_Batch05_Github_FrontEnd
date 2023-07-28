import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLoadComponent } from './section-load.component';

describe('SectionLoadComponent', () => {
  let component: SectionLoadComponent;
  let fixture: ComponentFixture<SectionLoadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionLoadComponent]
    });
    fixture = TestBed.createComponent(SectionLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
