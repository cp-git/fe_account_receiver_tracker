
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoicedetails } from '../class/invoicedetails';
import { Observable, catchError, of } from 'rxjs';
import { invoicegen } from '../components/class/invoicegen';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  private invoiceUrl: string = `http://localhost:8090/invoice/excel`;
  // private invoiceUrl: string = `http://localhost:8090/excel`;
  private countryUrl: any;
  private companyUrl: any;

  // Constructor to initialize the HttpClient and set the employeeUrl, countryUrl, and companyUrl
  constructor(private _http: HttpClient) {


  }


  updateInvoiceDetailsByInvoiceNo(invoiceNo: string, invoiceGen: Invoicedetails): Observable<Object> {
    return this._http.put<any>(`${this.invoiceUrl}/update/` + invoiceNo, invoiceGen);
  }

  updatePaidDateAsToday(invoiceNumbers: string[]): Observable<Object> {
    return this._http.post<any>(`${this.invoiceUrl}/updatePaidDate`, invoiceNumbers);
  }
  updateRecDateAsToday(invoiceNumbers: string[]): Observable<Object> {
    return this._http.post<any>(`${this.invoiceUrl}/updateRecDate`, invoiceNumbers);
  }
  updateSecondPaidDateAsToday(invoiceNumbers: string[]): Observable<Object> {
    return this._http.post<any>(`${this.invoiceUrl}/updateSecondDate`, invoiceNumbers);
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



  getAllInvoiceDataByStatusId(setdays: number): Observable<Invoicedetails[]> {
    // alert(this.getAllEmployees)
    // Send a GET request to the API to retrieve a list of all employees
    return this._http.get<Invoicedetails[]>(`${this.invoiceUrl}/invoiceProgress/${setdays}`);
  }


  getInvoicesByDateRangeAndStatus(startDate: Date, endDate: Date, status: number): Observable<Invoicedetails[]> {
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];

    let params = new HttpParams()
      .set('startDate', startDateString)
      .set('endDate', endDateString)
      .set('status', status.toString());

    return this._http.get<Invoicedetails[]>(`${this.invoiceUrl}/filterDateRange`, { params })
      .pipe(
        catchError(this.handleError<Invoicedetails[]>('getInvoicesByDateRangeAndStatus', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }



}


