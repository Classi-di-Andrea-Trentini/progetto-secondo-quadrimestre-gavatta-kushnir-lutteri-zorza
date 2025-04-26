import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAccountComponent } from './community-account.component';

describe('CommunityAccountComponent', () => {
  let component: CommunityAccountComponent;
  let fixture: ComponentFixture<CommunityAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
