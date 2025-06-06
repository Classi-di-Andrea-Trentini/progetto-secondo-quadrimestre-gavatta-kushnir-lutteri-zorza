import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameComponent } from './page-game.component';

describe('PageGameComponent', () => {
  let component: PageGameComponent;
  let fixture: ComponentFixture<PageGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
