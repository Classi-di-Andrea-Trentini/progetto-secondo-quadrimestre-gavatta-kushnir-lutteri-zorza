import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNegozioComponentPoteteancheEliminarloComponent } from './test-negozio-component-poteteanche-eliminarlo.component';

describe('TestNegozioComponentPoteteancheEliminarloComponent', () => {
  let component: TestNegozioComponentPoteteancheEliminarloComponent;
  let fixture: ComponentFixture<TestNegozioComponentPoteteancheEliminarloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNegozioComponentPoteteancheEliminarloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNegozioComponentPoteteancheEliminarloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
