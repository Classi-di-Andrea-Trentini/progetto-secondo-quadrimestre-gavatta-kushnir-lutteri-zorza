import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerzaPageComponent } from './terza-page.component';

describe('TerzaPageComponent', () => {
  let component: TerzaPageComponent;
  let fixture: ComponentFixture<TerzaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerzaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerzaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
