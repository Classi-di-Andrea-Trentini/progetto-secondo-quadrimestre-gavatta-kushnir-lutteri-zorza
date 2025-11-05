import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayImmaginiComponent } from './display-immagini.component';

describe('DisplayImmaginiComponent', () => {
  let component: DisplayImmaginiComponent;
  let fixture: ComponentFixture<DisplayImmaginiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayImmaginiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayImmaginiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
