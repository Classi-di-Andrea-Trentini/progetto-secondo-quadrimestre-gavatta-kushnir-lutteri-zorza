import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovitaDelNegozioComponent } from './novita-del-negozio.component';

describe('NovitaDelNegozioComponent', () => {
  let component: NovitaDelNegozioComponent;
  let fixture: ComponentFixture<NovitaDelNegozioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovitaDelNegozioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovitaDelNegozioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
