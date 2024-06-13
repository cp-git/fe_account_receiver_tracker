import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoicedetails } from '../../class/invoicedetails';
import { InvoiceService } from '../../services/invoice.service';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { HttpEventType } from '@angular/common/http';
import { style } from '@angular/animations';
import { invoicegen } from '../class/invoicegen';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-invoicegen',
  templateUrl: './invoicegen.component.html',
  styleUrls: ['./invoicegen.component.css']
})
export class InvoicegenComponent implements OnInit {



  selectedFile!: File;
  invoicedetails: Invoicedetails[] = [];
  formData = new FormData();
  message: string = '';
  success: boolean = true;

  invoicegenData= new invoicegen();
  constructor(
    private router: Router,
    private invoiceService: InvoiceService
  ) {

  }

  ngOnInit(): void {
    this.getAllInvoiceDetails();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  uploadFile(): void {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      this.invoiceService.uploadExcelFile(formData).subscribe(
        (response) => {
          console.log(response);
          
          // this.getAllInvoiceDetails();
           alert("File uploaded successfully");
        },
        (error) => {
          alert("upload file")
          this.getAllInvoiceDetails()
          // this.message = 'Failed to upload file';
          // this.success = false;
        }
      );
    }
  }
  getAllInvoiceDetails() {
    this.invoiceService.getAllInvoiceData().subscribe(
      (data: Invoicedetails[]) => {
        this.invoicedetails = data;
        console.log(this.invoicedetails);

      }, (erro) => {
        console.log("fail to get all");

      }
    )
  }

  addInvoicegen(invoicegenData:invoicegen){
    this.invoiceService.insertInvoice(invoicegenData).subscribe(
      response=>{
        console.log(response);
        alert("added successfully...")
        location.reload();
      },
      (error)=>{
        console.log(error);
        alert("Duplicate Name ")
        
      }
    
    )

  }

  async generateInvoiceByInvoiceNo(invoiceId: any) {
    const invoiceInfo: any = await this.invoiceService
      .getInvoiceByInvoiceId(invoiceId)
      .toPromise();

    console.log("****" + JSON.stringify(invoiceInfo));

    const invoiceHeaderStyle = {
      // fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      alignment: 'center',
      color: 'black',
      margin: [5, 5],
    };
    const details = {
      // fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      // alignment: 'center',
      color: 'black',
    };
    const header = {
      bold: true,
      fontSize: 14,
      textalign: 'center',
      color: 'black',
    };
    const pdfContent: Content = [];
    const invoiceHeaderRow = [
      { text: 'Customer', style: invoiceHeaderStyle },
      { text: 'Invoice No', style: invoiceHeaderStyle },
      { text: 'Invoice Date', style: invoiceHeaderStyle },
      { text: 'Invoice Amount', style: invoiceHeaderStyle },
      { text: 'Financed Amount', style: invoiceHeaderStyle },
      { text: 'Setup', style: invoiceHeaderStyle },
      { text: 'Interest', style: invoiceHeaderStyle },
      { text: 'Paid Amount', style: invoiceHeaderStyle },
      { text: 'Paid Date', style: invoiceHeaderStyle },
      // { text: 'Credit Days', style: invoiceHeaderStyle },
      // { text: 'Due Date', style: invoiceHeaderStyle },
      // { text: 'Recd Date', style: invoiceHeaderStyle },
      // { text: 'Bal Amount', style: invoiceHeaderStyle },
      // { text: 'Second Paid Date', style: invoiceHeaderStyle },
    ];

    const invoiceDataRow = [
      { text: 'Datasys Inc' },
      { text: invoiceInfo.invoiceNo },
      { text: invoiceInfo.invoiceDate },
      { text: invoiceInfo.invoiceAmt },
      { text: invoiceInfo.financedAmount },
      { text: invoiceInfo.setup },
      { text: invoiceInfo.interest },
      { text: invoiceInfo.paidAmt },
      { text: invoiceInfo.paidDate },
      // { text: invoiceInfo.creditDays },
      // { text: invoiceInfo.dueDate },
      // { text: invoiceInfo.recdDate },
      // { text: invoiceInfo.balAmt },
      // { text: invoiceInfo.secondPaidDate },
    ];

    // pdfContent.push(
    //   { text: 'Schedule of Accounts', style: header },
    //   { text: 'Excel Factoring Group, LLC', style: header },
    //   { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
    // )
    pdfContent.push(
      { text: 'Invoice Details', style: 'header' },
      {
        table: {
          headerRows: 1,
          widths: [55, 45, 45, 45, 45, 45, 45, 45, 45],
          body: [
            invoiceHeaderRow,
            invoiceDataRow,
          ]
        },
      },
      // { text: " " },
      // { text: "Submitted Date: " + "NA", style: details },
      // { text: "Company : " + "DATASYS CONSULTING & SOFTWARE, IN", style: details },
      // { text: "Signature : " + "_______________", style: details },
      // { text: "Name/Title : " + "Suresh Babu, President", style: details }
    )

    const documentDefinition: TDocumentDefinitions = {
      // pageOrientation: 'landscape',
      content: pdfContent,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
      },
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: '',
              alignment: 'left',
              margin: [40, 0]
            },
            {
              text: '',
              alignment: 'right',
              margin: [0, 0, 40, 0]
            }
          ]
        };
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }


}