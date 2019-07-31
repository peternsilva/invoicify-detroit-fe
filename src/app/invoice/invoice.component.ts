import { Component, OnInit, Input } from '@angular/core';

import * as jspdf from 'jspdf';  

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [fadeInAnimation]
})
export class InvoiceComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  selectedInvoiceId = 0;
  invoices: any[];
  unpaidInvoices: any[];
  paidInvoices: any[];
  duplicateResults: any[];

  constructor (private dataService: DataService) {}

  ngOnInit() { 
    this.getInvoices(); 
    this.getPaidInvoices(); 
    this.getUnpaidInvoices(); 
  }

  getInvoices() {
    this.dataService.getRecords("invoice")
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }

  getPaidInvoices() {
    this.dataService.getRecords("invoice/paid")
      .subscribe(
        results => this.paidInvoices = results,
        error =>  this.errorMessage = <any>error);
  }

  getUnpaidInvoices() {
    this.dataService.getRecords("invoice/unpaid")
      .subscribe(
        results => this.unpaidInvoices = results,
        error =>  this.errorMessage = <any>error);
  }


  onSelectionChange(invoiceId) {
      this.selectedInvoiceId = invoiceId;
  }

  duplicateInvoice(selectedInvoiceId) {
    console.log("inside duplicate invoice")
    console.log(selectedInvoiceId)

    this.dataService.duplicateInvoice("invoice/duplicate", selectedInvoiceId).subscribe(
      results => this.duplicateResults = results,
      error => this.errorMessage = <any>error);  

      var i;
      for (i = 0; i < 25; i++) { 
        this.getUnpaidInvoices();
      }
  }

  trackByFn(index, item) {
    return index; 
  }

  public makePDF()  
  {  
    var data = document.getElementById('PDFify-Unpaid'); 
    var data2 = document.getElementById('PDFify-Paid');  

  let margins = {
    top: 80, bottom: 60, left: 60, width: 522
    };
  
    let pdf = new jspdf('p', 'pt', 'letter');
    pdf.fromHTML(data, margins.left, margins.top);
    pdf.addPage();
    pdf.fromHTML(data2, margins.left, margins.top);

    pdf.save('PDFify.pdf'); 
  }  

}
