import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../services/invoice.service';
import { Invoicedetails } from '../../class/invoicedetails';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-updateinvoice',
  templateUrl: './updateinvoice.component.html',
  styleUrls: ['./updateinvoice.component.css'],
  providers: [DatePipe]
})
export class UpdateinvoiceComponent implements OnInit {

  invoiceDetails!: Invoicedetails
  today: string;
  cloneInvoiceDetails!: Invoicedetails;

  constructor(
    private invoiceService: InvoiceService,
    private location: Location,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<UpdateinvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.invoiceDetails = this.data.invoice
    this.cloneInvoiceDetails = JSON.parse(JSON.stringify(this.invoiceDetails));
    // throw new Error('Method not implemented.');
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.invoiceService.updateInvoiceByInvoiceNo(this.invoiceDetails.invoiceNo, this.invoiceDetails).subscribe(
      (response) => {
        // alert("Updated Successfully");
      },
      error => {
        alert("failed to update");
        // location.reload();
      }
    );
  }
  updateInvoice(invoiceDetails: Invoicedetails) {
    this.invoiceService.updateInvoiceByInvoiceNo(invoiceDetails.invoiceNo, invoiceDetails).subscribe(
      (response) => {
        // alert("Updated Successfully" + response);
        location.reload();
      },
      error => {
        alert("failed to update" + error);
      }
    );
  }
}
