import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  isFinancier: boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'pass') {
      // Set session storage for admin
      sessionStorage.setItem('isAdmin', 'true');
      alert("Admin login successful...");
      this.router.navigate(['/invoice']);
    } else if (this.username === 'financier' && this.password === 'pass') {
      // Set session storage for financier
      sessionStorage.setItem('isFinancier', 'true');
      alert("Financier login successful...");
      this.router.navigate(['/invoice']);
    } else {
      // Handle invalid credentials
      alert("Invalid credentials");
    }
  }

}
