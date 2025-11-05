import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaPageComponent } from './seconda-page.component';

describe('SecondaPageComponent', () => {
  let component: SecondaPageComponent;
  let fixture: ComponentFixture<SecondaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
