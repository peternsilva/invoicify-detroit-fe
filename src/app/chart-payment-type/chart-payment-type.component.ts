import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service'
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-chart-payment-type',
  templateUrl: './chart-payment-type.component.html',
  styleUrls: ['./chart-payment-type.component.css']
})
export class ChartPaymentTypeComponent implements OnInit {

  
  errorMessage: string;
  successMessage: string;
  invoices: any[];
  dataCards: any;
  title = 'canvasjs-angular';

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.getDataCards();
  }
  private createDonutGraph(dataPoints: any[], chartName: String, color: String, textVal: String) {

    console.log("datapoints ", dataPoints);
    let defColor : String;
    if (color === "red"){
        defColor = "#FF5733";
    }
    else if (color === "green"){
      defColor = "#33FF5F";
    }
    else if (color === "blue"){
      defColor = "#33C5FF";
    }
    let chart = new CanvasJS.Chart(chartName, {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: textVal
      },
      axisX: {
        valueFormatString: "DD MMM YYYY",
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Balance (in USD)",
        includeZero: false,
        valueFormatString: "$##0.00",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function (e) {
            return "$" + CanvasJS.formatNumber(e.value, "##0.00");
          }
        }
      },
      data: [{
        type: "doughnut",
        startAngle: 60,
        innerRadius: 60,
        indexLabelFontSize: 17,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  getDataCards() {
    this.dataService.getRecords("data/")
      .subscribe((results) => {
        this.dataCards = results;

        this.setDataCards();
        return this.dataCards = results;
      }, error => { this.errorMessage = <any>error });

  }
  setDataCards() {
    let dataPoints = new Array();
    let colorTYPE = new Array();
    colorTYPE = ["#FF5733","#33FF5F","#33C5FF"];
    let i = 0;
    this.dataCards.findByRecordType.forEach(paymentMeth => {
      if (paymentMeth[1] === "FlatFeeBillingRecord")
        paymentMeth[1] = "Flat Fee"
      else
        paymentMeth[1] = "Rate Based"
      dataPoints.push({ y: paymentMeth[0], label:paymentMeth[1], color: colorTYPE[i]});
      i = i+1;
    });
    console.log("dataPoints----",dataPoints);
    this.createDonutGraph(dataPoints, "paymentMethChart","blue", "Payment Type");

  }



}
