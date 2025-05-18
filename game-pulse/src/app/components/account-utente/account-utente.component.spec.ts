import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUtenteComponent } from './account-utente.component';

describe('AccountUtenteComponent', () => {
  let component: AccountUtenteComponent;
  let fixture: ComponentFixture<AccountUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
