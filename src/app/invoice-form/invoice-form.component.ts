import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
  animations: [fadeInAnimation]
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: NgForm;
  @ViewChild('invoiceForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;
  billingRecords: any[];
  companies: any[];
  specificBillingRecords: any[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() { 
    this.getBillingRecords(); 
    this.getCompanies();
    // this.getRecordByCompany();
  }

  getRecordByCompany(event: any){


    // selectChangeHandler (event: any) {
    //   //update the ui
    //   this.selectedDay = event.target.value;
    // }
    console.log(event);

    console.log(event.target)


    console.log(event.target.value)


    let temp = event.target.value

    let colon = temp.indexOf(":")


    let id = event.target.value.slice(colon+2,)

    console.log(id)


    // console.log(event.target.ng-reflect-ng-value);

    this.dataService.getRecordsById("billing-record",id)
      .subscribe(
        results => this.specificBillingRecords = results,
        error => this.errorMessage = <any>error);

    // console.log(this.specificBillingRecords);


  }


  trackByFn(index, item) {
    return index; // or item.id
  }

  getBillingRecords() {
    this.dataService.getRecords("billing-record")
      .subscribe(
        results => this.billingRecords = results,
        error => this.errorMessage = <any>error);
  }

  getCompanies() {
    this.dataService.getRecords("company")
      .subscribe(
        companies => this.companies = companies,
        error =>  this.errorMessage = <any>error);
  }

  saveInvoice(invoiceForm: NgForm) {
    let endpoint = "invoice/" + invoiceForm.value.client;
    delete(invoiceForm.value.client)
    this.dataService.addRecord(endpoint, invoiceForm.value)
      .subscribe(
        company => this.successMessage = "Record added successfully",
        error => this.errorMessage = <any>error);
    this.invoiceForm.reset()

  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.invoiceForm = this.currentForm;
    this.invoiceForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.invoiceForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'invoiceDescription': ''
  };

  validationMessages = {
    'invoiceDescription': {
      'required': 'Description name is required.',
      'minlength': 'Description name must be at least 5 characters long.',
      'maxlength': 'Description name cannot be more than 30 characters long.'
    }
  };
}
