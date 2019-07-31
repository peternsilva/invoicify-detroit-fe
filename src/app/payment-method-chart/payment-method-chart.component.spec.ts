import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodChartComponent } from './payment-method-chart.component';

describe('PaymentMethodChartComponent', () => {
  let component: PaymentMethodChartComponent;
  let fixture: ComponentFixture<PaymentMethodChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentMethodChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
