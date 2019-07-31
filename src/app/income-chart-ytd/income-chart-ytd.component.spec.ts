import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeChartYTDComponent } from './income-chart-ytd.component';

describe('IncomeChartYTDComponent', () => {
  let component: IncomeChartYTDComponent;
  let fixture: ComponentFixture<IncomeChartYTDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeChartYTDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeChartYTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
