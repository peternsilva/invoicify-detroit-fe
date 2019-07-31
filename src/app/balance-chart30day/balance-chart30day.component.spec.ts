import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceChart30dayComponent } from './balance-chart30day.component';

describe('BalanceChart30dayComponent', () => {
  let component: BalanceChart30dayComponent;
  let fixture: ComponentFixture<BalanceChart30dayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceChart30dayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceChart30dayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
