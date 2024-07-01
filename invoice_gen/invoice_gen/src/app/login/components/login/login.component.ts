import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DialogService } from 'src/app/dialog/service/dialog.service';
import { LoginDetailsService } from '../../services/login-details.service';

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
    private dialogService: DialogService,
    private loginDetailsService: LoginDetailsService
  ) { }

  ngOnInit(): void {
  }

  // onSubmit() {
  //   if (this.username === 'admin' && this.password === 'pass') {
  //     // Set session storage for admin
  //     sessionStorage.setItem('isAdmin', 'true');
  //     this.dialogService.openDeleteConfirmationDialog("Login successful.").subscribe(result => {
  //       if (result === false) {
  //         this.router.navigate(['/invoice']);
  //       }
  //     });
  //     // alert("Admin login successful...");

  //   } else if (this.username === 'financier' && this.password === 'pass') {
  //     // Set session storage for financier
  //     sessionStorage.setItem('isFinancier', 'true');
  //     this.dialogService.openDeleteConfirmationDialog("Login successful.").subscribe(result => {
  //       if (result === false) {
  //         this.router.navigate(['/invoice']);
  //       }
  //     });
  //     // alert("Financier login successful...");

  //   } else {
  //     // Handle invalid credentials
  //     this.dialogService.openDeleteConfirmationDialog("Invalid credentials")
  //     // alert("Invalid credentials");
  //   }
  // }


  onSubmit() {
    if (this.username && this.password) {
      console.log(this.password)
      this.loginDetailsService.getLoginDetailsByUsername(this.username).subscribe(
        loginDetails => {
          if (loginDetails && loginDetails.password === this.password) {
            sessionStorage.setItem('loginDetailsId', loginDetails.id.toString());

            if (loginDetails.role.roleName === 'COMPANY_MEMBER') {
              sessionStorage.setItem('isFinancier', 'false');

              this.dialogService.openDeleteConfirmationDialog("Login successful.").subscribe(result => {
                if (!result) {
                  this.router.navigate(['/invoice']);
                }
              });
            } else if (loginDetails.role.roleName === 'FINANCIER' ) {
           
              
     
              sessionStorage.setItem('isFinancier', 'true');
             
              this.dialogService.openDeleteConfirmationDialog("Login successful.").subscribe(result => {
                if (!result) {
                  this.router.navigate(['/invoice']);
                }
              });
            } else {
              this.dialogService.openDeleteConfirmationDialog("Invalid role");
            }
          } else {
            this.dialogService.openDeleteConfirmationDialog("Invalid credentials");
          }
        },
        error => {
          console.error(error);
          this.dialogService.openDeleteConfirmationDialog("Error occurred while fetching login details.");
        }
      );
    } else {
      this.dialogService.openDeleteConfirmationDialog("Username and password are required.");
    }
  }

}
