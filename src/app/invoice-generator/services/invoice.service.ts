import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoicedetails } from '../class/invoicedetails';
import { Observable } from 'rxjs';
import { invoicegen } from '../components/class/invoicegen';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  private invoiceUrl: string = `http://localhost:8090/excel`;
  private countryUrl: any;
  private companyUrl: any;

  // Constructor to initialize the HttpClient and set the employeeUrl, countryUrl, and companyUrl
  constructor(private _http: HttpClient) {


  }


  getAllInvoiceData(): Observable<Invoicedetails[]> {
    // alert(this.getAllEmployees)
    // Send a GET request to the API to retrieve a list of all employees
    return this._http.get<Invoicedetails[]>(`${this.invoiceUrl}/getAllData`);
  }

  getInvoiceByInvoiceId(invoiceId: any): Observable<Invoicedetails> {
    // alert(this.getAllEmployees)
    // Send a GET request to the API to retrieve a list of all employees
    return this._http.get<Invoicedetails>(`${this.invoiceUrl}/getInvoice/${invoiceId}`);
  }
  uploadExcelFile(formData: FormData): Observable<any> {
    // Send a POST request to the API endpoint for creating a new employee
    console.log(formData);

    return this._http.post<any>(`${this.invoiceUrl}/import`, formData);
  }


  insertInvoice(invoice: invoicegen): Observable<any> {
    // Send a POST request to the API endpoint for creating a new employee
    return this._http.post<any>(`${this.invoiceUrl}/invoiceData`, invoice);
  }

}
