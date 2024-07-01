import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDetails } from '../class/logindetails';


@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {
  private apiUrl = 'http://localhost:8010/api/logindetails'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getAllLoginDetails(): Observable<LoginDetails[]> {
    return this.http.get<LoginDetails[]>(this.apiUrl);
  }

  getLoginDetailsById(id: number): Observable<LoginDetails> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<LoginDetails>(url);
  }

  createLoginDetails(loginDetails: LoginDetails): Observable<LoginDetails> {
    return this.http.post<LoginDetails>(this.apiUrl, loginDetails);
  }

  updateLoginDetails(id: number, loginDetails: LoginDetails): Observable<LoginDetails> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<LoginDetails>(url, loginDetails);
  }

  deleteLoginDetails(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getLoginDetailsByUsername(username: string): Observable<LoginDetails> {
    const url = `${this.apiUrl}/username/${username}`;
    return this.http.get<LoginDetails>(url);
  }
}
