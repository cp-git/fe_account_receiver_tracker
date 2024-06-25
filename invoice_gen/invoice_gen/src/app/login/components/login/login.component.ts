import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DialogService } from 'src/app/dialog/service/dialog.service';

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
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.username === 'admin' && this.password === 'pass') {
      // Set session storage for admin
      sessionStorage.setItem('isAdmin', 'true');
      this.dialogService.openDeleteConfirmationDialog("Login successful.").subscribe(result => {
        if (result === false) {
          this.router.navigate(['/invoice']);
        }
      });
      // alert("Admin login successful...");

    } else if (this.username === 'financier' && this.password === 'pass') {
      // Set session storage for financier
      sessionStorage.setItem('isFinancier', 'true');
      this.dialogService.openDeleteConfirmationDialog("Login successful.").subscribe(result => {
        if (result === false) {
          this.router.navigate(['/invoice']);
        }
      });
      // alert("Financier login successful...");

    } else {
      // Handle invalid credentials
      this.dialogService.openDeleteConfirmationDialog("Invalid credentials")
      // alert("Invalid credentials");
    }
  }

}
