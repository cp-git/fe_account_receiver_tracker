import { Component, Inject } from '@angular/core';
import { Invoicedetails } from '../../class/invoicedetails';
import { InvoiceService } from '../../services/invoice.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
@Component({
  selector: 'app-adminupdateinvoice',
  templateUrl: './adminupdateinvoice.component.html',
  styleUrls: ['./adminupdateinvoice.component.css'],
  providers: [DatePipe]
})
export class AdminupdateinvoiceComponent {
  invoiceDetails!: Invoicedetails
  today: string;
  cloneInvoiceDetails!: Invoicedetails;

  constructor(
    private invoiceService: InvoiceService,
    private location: Location,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AdminupdateinvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    dialogRef.disableClose = true;
  }
  ngOnInit(): void {
    this.invoiceDetails = this.data.invoice
    this.cloneInvoiceDetails = JSON.parse(JSON.stringify(this.invoiceDetails));
    this.checkAmt();
    // throw new Error('Method not implemented.');
  }

  isFinanceAndInvoiceAmtSame: boolean = false
  checkAmt() {
    if (this.invoiceDetails.invoiceAmt === this.invoiceDetails.financedAmount) {
      this.isFinanceAndInvoiceAmtSame = true
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.invoiceService.updateInvoiceByInvoiceNo(this.invoiceDetails.invoiceNo, this.invoiceDetails).subscribe(
      (response) => {
        // alert("Updated Successfully");
        this.onNoClick();
      },
      error => {
        alert("failed to update");
        // location.reload();
      }
    );
  }
  updateInvoice(invoiceDetails: Invoicedetails) {
    this.invoiceService.updateInvoiceById(invoiceDetails.id, invoiceDetails).subscribe(
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
