import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaPageComponent } from './prima-page.component';

describe('PrimaPageComponent', () => {
  let component: PrimaPageComponent;
  let fixture: ComponentFixture<PrimaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
