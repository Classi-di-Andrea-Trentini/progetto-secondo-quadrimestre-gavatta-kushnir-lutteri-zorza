import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltriGiochiComponent } from './altri-giochi.component';

describe('AltriGiochiComponent', () => {
  let component: AltriGiochiComponent;
  let fixture: ComponentFixture<AltriGiochiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltriGiochiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltriGiochiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
