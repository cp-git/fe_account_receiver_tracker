import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoicedetails } from '../../class/invoicedetails';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
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
  invoiceHeaderRow: any = []
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
    const formatDate = (date: Date): string => {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${month}/${day}/${year}`;
    };

    const invoiceHeaderStyle = {
      bold: true,
      fontSize: 12,
      alignment: 'left',
      color: 'black',
      margin: [5, 5],
    };

    const invoiceDataStyle = {
      bold: false,
      fontSize: 12,
      alignment: 'right',
      color: 'black',
      margin: [5, 5],
    };

    const details = {
      bold: true,
      fontSize: 12,
      lineHeight: 1.3,
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
      alignment: 'center' as 'center',
      color: 'black',
      'lineSpacing': {
        margin: [0, 0, 0, 10]
      }
    };

    const lineHeight = {
      lineHeight: 1,
      noBorder: true
    };

    const height = {
      lineHeight: 0.5
    };

    const schedule = {
      fontSize: 10,
      color: 'black',
    };
    const defaultDate = new Date(''); // or any other date you prefer

    const pdfContent: Content[] = [];
    // Add the main header content once
    if (this.statusId == 1) {
      pdfContent.push(
        { text: 'Invoices by Paid Date', style: titlepdf },
        { text: ' ', style: height },
        { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
        { text: ' ', style: height },
      );
    }
    if (this.statusId == 2) {
      pdfContent.push(
        { text: 'Invoices by Received Date', style: titlepdf },
        { text: ' ', style: height },
        { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
        { text: ' ', style: height },
      );
    }
    if (this.statusId == 3) {
      pdfContent.push(
        { text: 'Invoices by Second Paid Date', style: titlepdf },
        { text: ' ', style: height },
        { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
        { text: ' ', style: height },
      );
    }
    if (this.statusId == 0) {
      pdfContent.push(
        { text: 'Invoices by Invoice Date', style: titlepdf },
        { text: ' ', style: height },
        { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
        { text: ' ', style: height },
      );
    }
    if (this.statusId == 5) {
      pdfContent.push(
        { text: 'Open Invoices', style: titlepdf },
        { text: ' ', style: height },
        { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
        { text: ' ', style: height },
      );
    }

    // Define the invoice table header row

    if (this.statusId == 2) {
      this.invoiceHeaderRow = [
        { text: ' ', style: invoiceHeaderStyle },
        { text: 'Invoice No', style: invoiceHeaderStyle },
        { text: 'Invoice Date', style: invoiceHeaderStyle },
        { text: 'Recvd. Date', style: invoiceHeaderStyle },
        { text: 'Invoice Amt', style: invoiceHeaderStyle },
      ];
    }
    if (this.statusId == 1) {
      this.invoiceHeaderRow = [
        { text: ' ', style: invoiceHeaderStyle },
        { text: 'Invoice No', style: invoiceHeaderStyle },
        { text: 'Invoice Date', style: invoiceHeaderStyle },
        { text: 'Paid Date', style: invoiceHeaderStyle },
        { text: 'Invoice Amt', style: invoiceHeaderStyle },
      ];
    }
    if (this.statusId == 3) {
      this.invoiceHeaderRow = [
        { text: ' ', style: invoiceHeaderStyle },
        { text: 'Invoice No', style: invoiceHeaderStyle },
        { text: 'Invoice Date', style: invoiceHeaderStyle },
        { text: 'Bal. Recvd. Date', style: invoiceHeaderStyle },
        { text: 'Invoice Amt', style: invoiceHeaderStyle },
      ];
    }
    if (this.statusId == 0) {
      this.invoiceHeaderRow = [
        { text: ' ', style: invoiceHeaderStyle },
        { text: 'Invoice No', style: invoiceHeaderStyle },
        { text: 'Invoice Date', style: invoiceHeaderStyle },
        { text: 'Paid Date', style: invoiceHeaderStyle },
        { text: 'Invoice Amt', style: invoiceHeaderStyle },
      ];
    }
    if (this.statusId == 5) {
      this.invoiceHeaderRow = [
        { text: ' ', style: invoiceHeaderStyle },
        { text: 'Invoice No', style: invoiceHeaderStyle },
        { text: 'Invoice Date', style: invoiceHeaderStyle },
        { text: ' Paid Date', style: invoiceHeaderStyle },
        { text: 'Invoice Amt', style: invoiceHeaderStyle },
      ];
    }
    // Initialize the table body with the header row
    const tableBody = [this.invoiceHeaderRow];

    let totalInvoiceAmount = 0;
    let totalFinancedAmount = 0;
    let totalIntrestAmount = 0;
    let totalSetup = 0;
    let totalPaidAmount = 0;

    const numberFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Helper function to format number with space between $ and amount
    const formatCurrencyWithSpace = (value: number): string => {
      return numberFormatter.format(value).replace('$', '$ ');
    };

    // Iterate over each invoice and add its data row to the table body
    this.invoices.forEach((invoice, index) => {
      totalInvoiceAmount += invoice.invoiceAmt || 0;
      totalFinancedAmount += invoice.financedAmount || 0;
      totalSetup += invoice.setup || 0;
      totalPaidAmount += invoice.paidAmt || 0;
      totalIntrestAmount += invoice.interest || 0;
      const totalAmount = invoice.invoiceAmt || 0;

      if (this.statusId == 1) {
        const invoiceDataRow = [
          { text: (index + 1).toString(), style: invoiceDataStyle },
          { text: invoice.invoiceNo, style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.invoiceDate)), style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.paidDate)), style: invoiceDataStyle },
          { text: formatCurrencyWithSpace(totalAmount), style: invoiceDataStyle },
        ];
        tableBody.push(invoiceDataRow);
      }
      if (this.statusId == 2) {
        const invoiceDataRow = [
          { text: (index + 1).toString(), style: invoiceDataStyle },
          { text: invoice.invoiceNo, style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.invoiceDate)), style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.recdDate)), style: invoiceDataStyle },
          { text: formatCurrencyWithSpace(totalAmount), style: invoiceDataStyle },
        ];
        tableBody.push(invoiceDataRow);
      }

      if (this.statusId == 3) {
        const invoiceDataRow = [
          { text: (index + 1).toString(), style: invoiceDataStyle },
          { text: invoice.invoiceNo, style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.invoiceDate)), style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.secondPaidDate)), style: invoiceDataStyle },
          { text: formatCurrencyWithSpace(totalAmount), style: invoiceDataStyle },
        ];
        tableBody.push(invoiceDataRow);
      }
      if (this.statusId == 5) {
        const invoiceDataRow = [
          { text: (index + 1).toString(), style: invoiceDataStyle },
          { text: invoice.invoiceNo, style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.invoiceDate)), style: invoiceDataStyle },
          { text: formatDate(new Date(invoice.paidDate)), style: invoiceDataStyle },
          { text: formatCurrencyWithSpace(totalAmount), style: invoiceDataStyle },
        ];
        tableBody.push(invoiceDataRow);
      }
      if (this.statusId == 0) {
        if (invoice.paidDate == null) {
          const invoiceDataRow = [
            { text: (index + 1).toString(), style: invoiceDataStyle },
            { text: invoice.invoiceNo, style: invoiceDataStyle },
            { text: formatDate(new Date(invoice.invoiceDate)), style: invoiceDataStyle },
            { text: '', style: invoiceDataStyle },
            { text: formatCurrencyWithSpace(totalAmount), style: invoiceDataStyle },
          ];
          tableBody.push(invoiceDataRow);
        } else {
          const invoiceDataRow = [
            { text: (index + 1).toString(), style: invoiceDataStyle },
            { text: invoice.invoiceNo, style: invoiceDataStyle },
            { text: formatDate(new Date(invoice.invoiceDate)), style: invoiceDataStyle },
            { text: formatDate(new Date(invoice.paidDate)), style: invoiceDataStyle },
            { text: formatCurrencyWithSpace(totalAmount), style: invoiceDataStyle },
          ];
          tableBody.push(invoiceDataRow);
        }
      }
    });

    // Add the table to the pdfContent
    pdfContent.push({
      table: {
        headerRows: 1,
        widths: [30, 110, 110, 110, 110],
        body: tableBody,
      },
    });

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

    const calculationsBlock = [
      [{ text: 'Invoice Amount', alignment: 'left', color: 'black' }, { text: formatCurrencyWithSpace(totalInvoiceAmount), alignment: 'right', color: 'black' }],
      [{ text: 'Financed Amount', alignment: 'left', color: 'black' }, { text: formatCurrencyWithSpace(totalFinancedAmount), alignment: 'right', color: 'black' }],
      [{ text: 'Setup', alignment: 'left', color: 'black' }, { text: formatCurrencyWithSpace(totalSetup), alignment: 'right', color: 'black' }],
      [{ text: 'Interest', alignment: 'left', color: 'black' }, { text: formatCurrencyWithSpace(totalIntrestAmount), alignment: 'right', color: 'black' }],
      [{ text: 'Net Advance', alignment: 'left', color: 'red' }, { text: formatCurrencyWithSpace(totalPaidAmount), alignment: 'right', color: 'red' }]
    ];

    pdfContent.push(
      { text: ' ', style: lineHeight },
    )
    pdfContent.push(
      {
        margin: [0, 0, 50, 0],
        table: {
          widths: ['30%', '20%'],
          body: calculationsBlock,
        },
      }
    );

    const documentDefinition: TDocumentDefinitions = {
      content: pdfContent,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
      },
    };
    const getFileName = (statusId: number): string => {
      console.log("****" + statusId);

      const currentDate = formatDate(new Date());
      if (statusId == 1) {
        return `Paid_Date_report_${currentDate}.pdf`;
      } else if (statusId == 2) {
        return `Received_Date_report_${currentDate}.pdf`;
      } else if (statusId == 3) {
        return `Second_Paid_Date_report_${currentDate}.pdf`;
      } else if (statusId == 5) {
        return `Open_Invoices_report_${currentDate}.pdf`;
      } else {
        return `Invoice_report_${currentDate}.pdf`;
      }
    };
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    const fileName = getFileName(this.statusId);
    // pdfDocGenerator.open();
    pdfDocGenerator.download(fileName);
  }






























  generateReportsForInvoiceDate() {
    // alert("inr")
    const formatDate = (date: Date): string => {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      return `${month}/${day}/${year}`;
    };

    const invoiceHeaderStyle = {
      bold: true,
      fontSize: 12,
      alignment: 'left',
      color: 'black',
      margin: [5, 5],
    };

    const details = {
      bold: true,
      fontSize: 12,
      lineHeight: 1.3,
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
      alignment: 'center' as 'center',
      color: 'black',
      'lineSpacing': {
        margin: [0, 0, 0, 10]
      }
    };

    const lineHeight = {
      lineHeight: 1
    };

    const height = {
      lineHeight: 0.5
    };

    const schedule = {
      fontSize: 10,
      color: 'black',
    };

    const pdfContent: Content[] = [];
    pdfContent.push(
      { text: 'Schedule of Accounts', style: titlepdf },
      { text: ' ', style: height },
      { text: 'DATASYS CONSULTING & SOFTWARE, INC', style: header },
      { text: ' ', style: height }
    );
    this.invoices.forEach((invoice, index) => {
      const invoiceAmt = invoice.invoiceAmt.toFixed(2);
      const financedAmount = invoice.financedAmount.toFixed(2);
      const setup = invoice.setup.toFixed(2);
      const paidAmt = (invoice.paidAmt || 0).toFixed(2);
      const interest = (invoice.interest || 0).toFixed(2);
      const totalAmount = invoice.invoiceAmt.toFixed(2);

      const invoiceHeaderRow = [
        { text: ' ', style: invoiceHeaderStyle },
        { text: 'Invoice #', style: invoiceHeaderStyle },
        { text: 'PO #', style: invoiceHeaderStyle },
        { text: 'Invoice Date', style: invoiceHeaderStyle },
        { text: 'Invoice Amt', style: invoiceHeaderStyle },
      ];

      const invoiceDataRow = [
        { text: (index + 1).toString() },
        { text: invoice.invoiceNo },
        { text: '' },
        { text: formatDate(new Date(invoice.invoiceDate)) },
        { text: totalAmount },
      ];

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

      const calculationsBlock = {
        text: `Invoice Amount    : ${invoiceAmt}
        
        Financed Amount : ${financedAmount}
        Setup                       : ${setup}
        Interest                   : ${interest}\n

        Net Advance          : ${paidAmt}`,
        margin: [5, 5, 5, 5],
        alignment: 'left',
        border: [true, true, true, true],
        width: 'auto',
        style: { fontSize: 12 },
      };



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
        }
      );

      pdfContent.push({ text: ' ', style: lineHeight });

      pdfContent.push({
        table: {
          widths: ['70%', '30%'],
          body: [
            [{ text: '', style: lineHeight }, { text: calculationsBlock, alignment: 'right' }]
          ],
        },
      });
    });

    const documentDefinition: TDocumentDefinitions = {
      content: pdfContent,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.open();
  }

}
