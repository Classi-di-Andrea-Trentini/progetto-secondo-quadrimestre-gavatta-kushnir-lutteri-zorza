import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreGamesComponent } from './explore-games.component';

describe('ExploreGamesComponent', () => {
  let component: ExploreGamesComponent;
  let fixture: ComponentFixture<ExploreGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
