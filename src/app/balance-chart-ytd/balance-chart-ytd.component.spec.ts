import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceChartYTDComponent } from './balance-chart-ytd.component';

describe('BalanceChartYTDComponent', () => {
  let component: BalanceChartYTDComponent;
  let fixture: ComponentFixture<BalanceChartYTDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceChartYTDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceChartYTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
