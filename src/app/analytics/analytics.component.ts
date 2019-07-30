import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';

import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  invoices: any[];
  dataCards: any;
  title = 'canvasjs-angular';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getInvoices();
    this.getDataCards();
  }

  private createLineGraph(dataPoints: any[], chartName: String) {
    dataPoints.sort((a, b) => {
      return a.x.getTime() - b.x.getTime();
    });
    console.log("datapoints ", dataPoints);

    let chart = new CanvasJS.Chart(chartName, {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Balance History (YTD)"
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
        type: "area",
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }

  private create30DayLineGraph(dataPoints: any[], chartName: String) {
    dataPoints.sort((a, b) => {
      return a.x.getTime() - b.x.getTime();
    });
    console.log("datapoints ", dataPoints);

    let chart = new CanvasJS.Chart(chartName, {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Balance History (30 day)"
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
        type: "area",
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "$##0.00",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }
  getBalanceOnDate(balance_date: Date): number {

    let curBal = 0.0;
    this.invoices.forEach(invoice => {
      console.log("paid on ", invoice.paidOn);
      if (!invoice.paidOn) {
        curBal += invoice.initialBalance;
      }
      else if (new Date(invoice.paidOn) > balance_date) {
        console.log("initial balance", invoice.initialBalance);
        curBal += invoice.initialBalance;
      }

    });
    console.log(curBal);
    return curBal;
  }
  getIncomeOnDate(balance_date: Date): number {

    let curBal = 0.0;
    this.invoices.forEach(invoice => {
      console.log("paid on ", invoice.paidOn);
      if (!invoice.paidOn) {
        return;
      }
      else if (new Date(invoice.paidOn) > balance_date) {
        console.log("initial balance", invoice.initialBalance);
        curBal += invoice.initialBalance;
      }

    });
    console.log(curBal);
    return curBal;
  }


  getInvoices() {
    this.dataService.getRecords("invoice/")
      .subscribe((results) => {
        this.invoices = results;

        this.getDataAndGraph();
        return this.invoices = results;
      }, error => { this.errorMessage = <any>error });

  }
  getDataCards() {
    this.dataService.getRecords("data/")
      .subscribe((results) => {
        this.dataCards = results;

        this.setDataCards();
        return this.dataCards = results;
      }, error => { this.errorMessage = <any>error });

  }

  private getDataAndGraph() {
    let dates_to_check = new Array();
    console.log(this.invoices);
    this.invoices.forEach(invoice => {
      console.log(new Date(invoice.createdOn));
      dates_to_check.push(new Date(invoice.createdOn));
      if (invoice.paidOn) {
        dates_to_check.push(new Date(invoice.paidOn));
      }
    });
    dates_to_check.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
    console.log("sorted dates --> ", dates_to_check);
    // console.log("RESULTS---->", results);
    let dataPoints = new Array();
    let dataPoints30day = new Array();
    let dataPointsIncome = new Array();
    dates_to_check.forEach(date => {
      let bal_on_date = this.getBalanceOnDate(date)
      if (date.getFullYear() === 2019)
        dataPoints.push({ x: date, y: bal_on_date });
      if (Date.now() - date.getTime() < 30 * 8.64e+7)
        dataPoints30day.push({ x: date, y: bal_on_date });
      if (date.getFullYear() === 2019) {
        let income_on_date = this.getIncomeOnDate(date);
        dataPointsIncome.push({x: date, y: income_on_date});
      }

    });
    this.createLineGraph(dataPoints, "chartContainer");
    this.create30DayLineGraph(dataPoints30day, "30dayChart");
    this.createLineGraph(dataPointsIncome, "incomeYTD");
  }

  private setDataCards() {
    //function to set the datacards we just grabbed
  }
}
