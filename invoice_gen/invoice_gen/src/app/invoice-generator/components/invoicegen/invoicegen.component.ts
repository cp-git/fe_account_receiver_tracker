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
import { DialogService } from 'src/app/dialog/service/dialog.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-invoicegen',
  templateUrl: './invoicegen.component.html',
  styleUrls: ['./invoicegen.component.css']
})
export class InvoicegenComponent implements OnInit {


  statusId!: number;
  selectedFile!: File;
  invoicedetails: Invoicedetails[] = [];
  deatailsData: Invoicedetails[] = [];
  formData = new FormData();
  message: string = '';
  success: boolean = true;
  isFinancier: boolean = false;
  todayDate: Date = new Date();
  invoicegenData = new invoicegen();
  invoiceNumbers: string[] = [];
  invoiceNumbersForUpdatingRecDate: string[] = [];
  invoiceNoForSndPaidDate: string[] = [];
  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private dialogService: DialogService
  ) {
    const Financer = sessionStorage.getItem('isFinancier')
    if (Financer !== null) {
      this.isFinancier = Financer === 'true'; // Convert string to boolean
    }
  }

  ngOnInit(): void {
    this.getAllInvoiceDetails();
    // alert(this.isFinancier)

  }
  onLogout() {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isFinancier');
    this.router.navigate(['/']);
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

  onCheckboxChange(event: any, invoiceNo: string): void {
    if (event.target.checked) {
      this.invoiceNumbers.push(invoiceNo);
    } else {
      const index = this.invoiceNumbers.indexOf(invoiceNo);
      if (index > -1) {
        this.invoiceNumbers.splice(index, 1);
      }
    }
    console.log(this.invoiceNumbers + "****");
  }
  onCheckboxRecDateChange(event: any, invoiceNoRec: string): void {
    if (event.target.checked) {
      this.invoiceNumbersForUpdatingRecDate.push(invoiceNoRec);
    } else {
      const index = this.invoiceNumbersForUpdatingRecDate.indexOf(invoiceNoRec);
      if (index > -1) {
        this.invoiceNumbersForUpdatingRecDate.splice(index, 1);
      }
    }
    console.log(this.invoiceNumbersForUpdatingRecDate + "****Rec");
  }
  onCheckboxSndDateChange(event: any, invoiceNoRec: string): void {
    if (event.target.checked) {
      this.invoiceNoForSndPaidDate.push(invoiceNoRec);
    } else {
      const index = this.invoiceNoForSndPaidDate.indexOf(invoiceNoRec);
      if (index > -1) {
        this.invoiceNoForSndPaidDate.splice(index, 1);
      }
    }
    console.log(this.invoiceNoForSndPaidDate + "**second");
  }
  updatePaidDate() {
    this.invoiceService.updatePaidDateAsToday(this.invoiceNumbers).subscribe(
      (respone) => {
        this.dialogService.openDeleteConfirmationDialog("Paid date updated successfully.").subscribe(result => {
          if (result === false) {
            this.invoiceNumbers = [];
            this.getAllInvoiceDetails();
          }
        });
        // alert("Due date updated Successfully");
        // this.getAllInvoiceDetails()

      }, (error) => {
        this.dialogService.openDeleteConfirmationDialog("Failed to update due date.")
        // alert("update Failed");
      }
    )

  }
  updateRecDate() {
    this.invoiceService.updateRecDateAsToday(this.invoiceNumbersForUpdatingRecDate).subscribe(
      (response) => {
        this.dialogService.openDeleteConfirmationDialog("Received date Updated successfully.").subscribe(result => {
          if (result === false) {
            this.invoiceNumbersForUpdatingRecDate = [];
            this.getAllInvoiceDetails()
          }
        });
        // alert("Rec date Updated Successfully");
        // this.invoiceNumbersForUpdatingRecDate = [];
        // this.getAllInvoiceDetails();
      }, (error) => {
        this.dialogService.openDeleteConfirmationDialog("Failed to update received date.")
        // alert("update Failed");
      }
    )
  }

  updateSndPaidDate() {
    this.invoiceService.updateSecondPaidDateAsToday(this.invoiceNoForSndPaidDate).subscribe(
      (response) => {
        this.dialogService.openDeleteConfirmationDialog("Second paid date updated successfully.").subscribe(result => {
          if (result === false) {
            this.invoiceNoForSndPaidDate = [];
            this.getAllInvoiceDetails();
          }
        });
        // alert("Second Paid Date Updated Successfully.");

      }, (error) => {
        this.dialogService.openDeleteConfirmationDialog("Failed to update second paid date.")
        // alert("update Failed");
      }
    )
  }
  updateInvoiceByInvoiceNo(updatedInvoice: Invoicedetails) {
    alert(JSON.stringify(updatedInvoice))
    this.invoiceService.updateInvoiceDetailsByInvoiceNo(updatedInvoice.invoiceNo, updatedInvoice).subscribe(
      (response) => {

        alert("invoice updated successfully");
      }, (error) => {
        alert("invoice updated Fail");
      }
    )
  }
  getAllInvoiceDetails() {
    this.invoiceService.getAllInvoiceData().subscribe(
      (data: Invoicedetails[]) => {
        this.invoicedetails = data;

        this.invoiceService.getAllInvoiceDataByStatusId(this.statusId).subscribe(
          response => {
            console.log(response);

            if (this.statusId != 4) {
              console.log("In Status Column Data...");
              this.deatailsData = response;
              this.invoicedetails = this.deatailsData;

            }


          }
        )
        console.log(this.invoicedetails);

      }, (erro) => {
        console.log("fail to get all");

      }
    )
  }

  addInvoicegen(invoicegenData: invoicegen) {

    this.invoiceService.insertInvoice(invoicegenData).subscribe(
      response => {
        console.log(response);
        this.dialogService.openDeleteConfirmationDialog("Invoice added successfully.").subscribe(result => {
          if (result === false) {
            this.getAllInvoiceDetails();
          }
        });

      },
      (error) => {
        console.log(error);
        this.dialogService.openDeleteConfirmationDialog("Duplicate invoice number - " + (invoicegenData.invoiceNo))
      }

    )
  }
  async generateInvoiceByInvoiceNo(invoiceId: any) {
    const invoiceInfo: any = await this.invoiceService
      .getInvoiceByInvoiceId(invoiceId)
      .toPromise();

    console.log("****" + JSON.stringify(invoiceInfo));
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${month}/${day}/${year}`;
    };
    const invoiceHeaderStyle = {
      // fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      alignment: 'left',
      color: 'black',
      margin: [5, 5],
    };
    const details = {
      // fillColor: '#A76AFF',
      bold: true,
      fontSize: 12,
      lineHeight: 1.3,
      // alignment: 'center',
      color: 'black',
    };
    const header = {
      bold: true,
      fontSize: 14,
      alignment: 'center' as 'center',
      color: 'black',

    };
    const titlepdf = {
      bold: true,
      fontSize: 18,
      //lineHeight: 1,
      alignment: 'center' as 'center',
      color: 'black',
      'lineSpacing': {
        margin: [0, 0, 0, 10] //change number 6 to increase nspace
      }
    };
    const lineHeight = {
      lineHeight: 1
    }
    const height = {
      lineHeight: 0.5
    }
    const boldBlueText = {
      bold: true,
      color: 'blue',
    };
    const schedule = {
      // bold: true,
      fontSize: 10,
      // alignment: '',
      color: 'black',
    };

    const pdfContent: Content = [];
    const invoiceHeaderRow = [
      { text: ' ', style: invoiceHeaderStyle },
      // { text: 'Customer', style: invoiceHeaderStyle },
      { text: 'Invoice #', style: invoiceHeaderStyle },
      { text: 'PO #', style: invoiceHeaderStyle },
      { text: 'Invoice Date', style: invoiceHeaderStyle },
      { text: 'Invoice Amt', style: invoiceHeaderStyle },
      // { text: 'Financed Amount', style: invoiceHeaderStyle },
      // { text: 'Setup', style: invoiceHeaderStyle },
      // { text: 'Interest', style: invoiceHeaderStyle },
      // { text: 'Paid Amount', style: invoiceHeaderStyle },
      // { text: 'Paid Date', style: invoiceHeaderStyle },
      // { text: 'Credit Days', style: invoiceHeaderStyle },
      // { text: 'Due Date', style: invoiceHeaderStyle },
      // { text: 'Recd Date', style: invoiceHeaderStyle },
      // { text: 'Bal Amount', style: invoiceHeaderStyle },
      // { text: 'Second Paid Date', style: invoiceHeaderStyle },
    ];

    const invoiceAmt = parseFloat(invoiceInfo.invoiceAmt);
    const financedAmount = parseFloat(invoiceInfo.financedAmount);
    const setup = parseFloat(invoiceInfo.setup);
    const paidAmt = parseFloat(invoiceInfo.paidAmt || 0);
    const interest = parseFloat(invoiceInfo.interest || 0);
    const totalAmount = parseFloat(invoiceInfo.invoiceAmt);

    const invoiceDataRow = [
      { text: '1' },
      // { text: 'Equinix ( US) Enterprises, Inc' },
      { text: invoiceInfo.invoiceNo },
      { text: '' },
      { text: formatDate(invoiceInfo.invoiceDate) },
      { text: totalAmount },

      // { text: invoiceInfo.financedAmount },
      // { text: invoiceInfo.setup },
      // { text: invoiceInfo.interest },
      // { text: invoiceInfo.paidAmt },
      // { text: invoiceInfo.paidDate },
      // { text: invoiceInfo.creditDays },
      // { text: invoiceInfo.dueDate },
      // { text: invoiceInfo.recdDate },
      // { text: invoiceInfo.balAmt },
      // { text: invoiceInfo.secondPaidDate },
    ];

    pdfContent.push(
      { text: 'Schedule of Accounts', style: titlepdf },
      { text: ' ', style: height },
      // { text: 'Excel Factoring Group, LLC', style: header },
      // { text: ' ', style: height },
      { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
      { text: ' ', style: height },

    )

    pdfContent.push(
      { text: 'Schedule Number  DATA-0003', style: schedule },
      {
        table: {
          headerRows: 1,
          widths: [30, 110, 110, 110, 110],
          body: [
            invoiceHeaderRow,
            invoiceDataRow,
          ]
        },
      },

    )

    const certificationText =
      `This is to certify that the parties named above are indebted to
    the undersigned in the sums set opposite their respective
    names,for merchandise sold and delivered or for work and  
    labor done and accepted.The undersigned hereby sells,assigns 
    and transfers all of its right, title and interest  in the
    above listed accounts receivable ('Invoices') to Excel Factoring 
    Group, LLC pursuant to that certain Accounts Receivable
    Purchase Agreement between the undersigned and Excel
    Factoring Group, LLC.`;

    // Block with paragraph text
    const paragraphBlock = {
      text: certificationText,
      margin: [5, 5, 5, 5],
      alignment: 'left',
      border: [true, true, true, true], // Add borders if needed
      width: 'auto', // Adjust width as needed
      style: { fontSize: 12, },
    };





    const calculationsBlock = [
      [{ text: 'Invoice Amount', alignment: 'left', color: 'black' }, { text: `$${invoiceAmt.toFixed(2)}`, alignment: 'right', color: 'black' }],
      [{ text: 'Financed Amount', alignment: 'left', color: 'black' }, { text: `$${financedAmount.toFixed(2)}`, alignment: 'right', color: 'black' }],
      [{ text: 'Setup', alignment: 'left', color: 'black' }, { text: `$${setup.toFixed(2)}`, alignment: 'right', color: 'black' }],
      [{ text: 'Interest', alignment: 'left', color: 'black' }, { text: `$${interest.toFixed(2)}`, alignment: 'right', color: 'black' }],
      [{ text: 'Net Advance', alignment: 'left', color: 'red' }, { text: `$${paidAmt.toFixed(2)}`, alignment: 'right', color: 'red' }]
    ];

    pdfContent.push(
      { text: ' ', style: lineHeight },
    )
    pdfContent.push(
      // { text: ' ', style: lineHeight },
      {
        // alignment: 'center',
        // layout: 'noBorders',
        margin: [0, 0, 50, 0],
        table: {
          widths: ['30%', '20%'], // Adjust widths as needed
          body: calculationsBlock,

        },
      }
    );



    // pdfContent.push(
    //   { text: " " },
    //   { text: "Submitted Date     :                      " + "NA", style: details },
    //   { text: "Company                :                      " + "DATASYS CONSULTING & SOFTWARE, IN", style: details },
    //   { text: "Signature                :                      " + "_______________", style: details },
    //   { text: "Name/Title             :                      " + "Suresh Babu, President", style: details }
    // )
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
      // footer: function (currentPage, pageCount) {
      //   return {
      //     columns: [
      //       {
      //         stack: [
      //           { text: 'Excel Factoring Group, LLC', bold: true },
      //           { text: '54 MARC DRIVE ,Dayton, New Jersey, 08810' },
      //           { text: 'Dayton, New Jersey, 08810' },
      //         ],
      //         alignment: 'left',
      //         margin: [40, 0]
      //       },
      //       {
      //         text: `Page ${currentPage} of ${pageCount}`,
      //         alignment: 'right',
      //         margin: [0, 0, 40, 0]
      //       }
      //     ]

      //   };
      // }
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }
}