import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../services/invoice.service';
import { Invoicedetails } from '../../class/invoicedetails';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { IntrestData } from '../../class/intrest-data';
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
  financedPercentage!: number;
  intrestData!: IntrestData
  @ViewChild('input', { read: MatInput }) input!: MatInput;

  finanacePercent!: number;



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
    this.checkAmt();
    this.getIntrestData()
  }
  isFinanceAndInvoiceAmtSame: boolean = false
  checkAmt() {
    if (this.invoiceDetails.invoiceAmt === this.invoiceDetails.financedAmount) {
      this.isFinanceAndInvoiceAmtSame = true
      console.log(this.isFinanceAndInvoiceAmtSame + "****");
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  reset() {

    this.invoiceDetails.paidDate = null;
  }

  reset1() {

    this.invoiceDetails.recdDate = null;
  }

  reset2() {

    this.invoiceDetails.secondPaidDate = null;
  }

  updateInvoice(invoiceDetails: Invoicedetails) {
    this.invoiceService.updateInvoiceByInvoiceNo(invoiceDetails.invoiceNo, invoiceDetails).subscribe(
      (response) => {
        location.reload();
      },
      error => {
        alert("failed to update" + error);
      }
    );
  }

  updateInvoiceAndFinancedPercentageById(invoiceDetails: Invoicedetails) {
    if (this.financedPercentage == undefined) { this.financedPercentage = 0 }
    this.invoiceService.updateInvoiceAndFinancedPercentageById(invoiceDetails.id, this.intrestData.finance_percent, invoiceDetails).subscribe(
      (response) => {
        location.reload();
      }, (error) => {
        alert("failed")
      }
    )
  }

  getIntrestData() {
    this.invoiceService.getIntrestDataById(1).subscribe(
      (data: IntrestData) => {
        this.intrestData = data;
        this.finanacePercent = this.intrestData.finance_percent;
        console.log("success");
      }, (error) => {
        console.log("fail");
      }
    )
  }
}
