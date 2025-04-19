import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraLateraleGeneriComponent } from './barra-laterale-generi.component';

describe('BarraLateraleGeneriComponent', () => {
  let component: BarraLateraleGeneriComponent;
  let fixture: ComponentFixture<BarraLateraleGeneriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraLateraleGeneriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraLateraleGeneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
