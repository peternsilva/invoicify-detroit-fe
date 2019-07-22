import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeInAnimation]
})
export class UserComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  users: any[];

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() { this.getUsers(); }

  getUsers() {
    this.dataService.getRecords("user")
      .subscribe(
        results => this.users = results,
        error =>  this.errorMessage = <any>error);
  }

  deleteUser(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("user", id)
          .subscribe(
            company => {this.successMessage = "Record(s) deleted succesfully"; this.getUsers(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}
