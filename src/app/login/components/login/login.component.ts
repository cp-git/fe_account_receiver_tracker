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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'pass') {
      // Redirect to the invoice route
      alert("Login successfully...");
      this.router.navigate(['/invoice']);
    } else {
      // For demo purposes, let's just log a message for invalid credentials
      console.log('Invalid credentials');
      alert("invalid credentials");
    }
  }

}
