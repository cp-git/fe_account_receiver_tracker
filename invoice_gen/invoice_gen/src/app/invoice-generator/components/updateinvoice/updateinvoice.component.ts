import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InvoiceService } from '../../services/invoice.service';
import { Invoicedetails } from '../../class/invoicedetails';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { IntrestData } from '../../class/intrest-data';
import { Invoice } from '../../class/invoice';
@Component({
  selector: 'app-updateinvoice',
  templateUrl: './updateinvoice.component.html',
  styleUrls: ['./updateinvoice.component.css'],
  providers: [DatePipe]
})
export class UpdateinvoiceComponent implements OnInit {

  invoiceDetails!: Invoice
  today: string;
  cloneInvoiceDetails!: Invoice;
  financedPercentage!: number;
  intrestData!: IntrestData
  @ViewChild('input', { read: MatInput }) input!: MatInput;



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
    window.location.reload();
  }

  reset() {

    this.invoiceDetails.paidDate = null;
    this.invoiceDetails.financePercent=0;
  }

  reset1() {

    this.invoiceDetails.recdDate = null;
  }

  reset2() {

    this.invoiceDetails.secondPaidDate = null;
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


  updateInvoiceAndFinancedPercentageById(invoiceDetails: Invoice) {
    // alert(JSON.stringify(invoiceDetails));
    if (this.invoiceDetails.financePercent == 0) {
       
       this.invoiceService.updateInvoiceById(invoiceDetails.id, invoiceDetails).subscribe(
        (response) => {
          alert("invoice updated successfully")
          location.reload();
        }, (error) => {
          alert("failed")
        }
      )
      }

    else{
          console.log("id" + invoiceDetails.id + "fin percentatge" + this.invoiceDetails.financePercent);

          this.invoiceService.updateInvoiceAndFinancedPercentageById(invoiceDetails.id, this.invoiceDetails.financePercent, invoiceDetails).subscribe(
            (response) => {
              alert("invoice updated successfully")
              location.reload();
            }, (error) => {
              alert("failed")
            }
          )
   }
  }
  getIntrestData() {
    this.invoiceService.getIntrestDataById(1).subscribe(
      (data: IntrestData) => {
        this.intrestData = data;
        // this.finanacePercent = this.intrestData.finance_percent;
        console.log("success");
      }, (error) => {
        console.log("fail");
      }
    )
  }
}
