import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css'],
  animations: [fadeInAnimation]
})
export class CompanyInfoComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  invoices: any[];

  constructor (
    private dataService: DataService,
    private route: ActivatedRoute
    ) {}

    ngOnInit() { 
    this.getInvoices(this.route.params['value']['id']); 
  }

  getInvoices(id: number) {
    this.dataService.getRecords("invoice/company/"+id)
      .subscribe(
        results => this.invoices = results,
        error =>  this.errorMessage = <any>error);
  }
}
