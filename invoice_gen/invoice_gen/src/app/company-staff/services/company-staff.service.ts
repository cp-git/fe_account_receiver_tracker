import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class CompanyStaffService {

  private baseUrl = 'http://localhost:8070/api/companyMembers'; // Adjust your API base URL

  constructor(private http: HttpClient) { }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  // Save company member
  saveCompanyMember(companyMember: any): Observable<any> {
    const url = `${this.baseUrl}/saveCompanyMember`;
    return this.http.post(url, companyMember)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get company member by ID
  getCompanyMemberById(memberId: number): Observable<any> {
    const url = `${this.baseUrl}/${memberId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all company members
  getAllCompanyMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update company member
  updateCompanyMember(memberId: number, updatedMember: any): Observable<any> {
    const url = `${this.baseUrl}/${memberId}`;
    return this.http.put(url, updatedMember)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete company member
  deleteCompanyMember(memberId: number): Observable<void> {
    const url = `${this.baseUrl}/${memberId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  fetchCompanyIdByLoginId(loginDetailsId: number): Observable<any> {
    // Assuming you have an endpoint to fetch companyId based on loginDetailsId
    const url = `${this.baseUrl}/by-login-details/${loginDetailsId}`;
    return this.http.get<number>(url);
  }
}
