import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeChartComponent } from './payment-type-chart.component';

describe('PaymentTypeChartComponent', () => {
  let component: PaymentTypeChartComponent;
  let fixture: ComponentFixture<PaymentTypeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTypeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
