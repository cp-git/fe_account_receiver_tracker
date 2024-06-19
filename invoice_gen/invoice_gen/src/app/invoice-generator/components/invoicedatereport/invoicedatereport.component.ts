import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoicedetails } from '../../class/invoicedetails';

@Component({
  selector: 'app-invoicedatereport',
  templateUrl: './invoicedatereport.component.html',
  styleUrls: ['./invoicedatereport.component.css']
})
export class InvoicedatereportComponent implements OnInit {


  invoices: Invoicedetails[] = [];
  startDate!: Date;
  endDate!: Date;
  statusId: number = 4;
  constructor(
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
  }
  getAllInvociesBySelectedDateRangeAndStatus() {
    // Convert the date strings to Date objects
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);


    // Call the service with proper Date objects
    this.invoiceService.getInvoicesByDateRangeAndStatus(startDateObj, endDateObj, this.statusId).subscribe(
      (response) => {
        this.invoices = response;
        // alert("Data filtered");
      }, (error) => {
        alert("Failed to get data");
      }
    )
  }


  generateReports() {
    alert("generate r")
  }
}
