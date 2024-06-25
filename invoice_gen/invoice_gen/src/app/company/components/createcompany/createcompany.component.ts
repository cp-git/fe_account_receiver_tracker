import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit {
  createCompanyForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.createCompanyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyContact: ['', Validators.required],
      companyPerson: [''],
      active: [false]
    });
  }

  ngOnInit(): void {}

  saveCompany(): void {
    if (this.createCompanyForm.valid) {
      // Your save logic here
      console.log('Company saved', this.createCompanyForm.value);
    } else {
      this.createCompanyForm.markAllAsTouched();
    }
  }
  
  goBack(): void {
    this.router.navigate(['/company']);

  }

}
