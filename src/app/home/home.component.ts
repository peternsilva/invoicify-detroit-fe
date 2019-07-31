import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent implements OnInit {

  errorMessage: string;
  dataCards: any;
  avgInvoiceAmount: number;
  avgTimeToPay: number;
  totalIncome: number;
  totalOutstandingAmount: number;
  numberOutstandingInvoices: number;
  numberPaidInvoices: number;
  paymentMethod: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getDataCards();
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
    // console.log(this.dataCards);
    this.avgInvoiceAmount = this.dataCards.averageInvoiceAmount;
    this.avgTimeToPay = this.dataCards.findAverageTimeToPay;
    this.totalIncome = this.dataCards.findSumInitalBalance[0];
    this.totalOutstandingAmount = this.dataCards.findTotalOutstandingAmount[0];
    this.numberOutstandingInvoices = this.dataCards.findTotalOutstandingInvoices[0];
    this.numberPaidInvoices = this.dataCards.findTotalPaidInvoices[0];
    this.paymentMethod = this.dataCards.findByMethodType;
    // this.
    console.log("payment method ====>",this.paymentMethod);
  }
}
