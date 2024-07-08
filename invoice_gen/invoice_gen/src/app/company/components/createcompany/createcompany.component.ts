import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CompanyStaffService } from 'src/app/company-staff/services/company-staff.service';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../classes/company';
import { combineAll } from 'rxjs';


@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.component.html',
  styleUrls: ['./createcompany.component.css']
})
export class CreatecompanyComponent implements OnInit {
  createCompanyForm: FormGroup;
 
  constructor(private fb: FormBuilder,private router: Router,private companyServ:CompanyService) {
    this.createCompanyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyContact: ['', Validators.required],
      companyPerson: [''],
      active: ['']
    });
  }

  ngOnInit(): void {}

  saveCompany(): void {
    if (this.createCompanyForm.valid) {

      const company = new Company(

      this.createCompanyForm.value.companyName,
      this.createCompanyForm.value.companyAddress,
      this.createCompanyForm.value.companyContact,
      this.createCompanyForm.value.companyPerson,
      this.createCompanyForm.value.active
  

      );
      this.companyServ.createCompany(company).subscribe(data => {

        console.log("Company UPdated successfully")
        this.router.navigate(['/company']);
      }, error => console.log(error));
      console.log('Company not saved');
    } else {
      this.createCompanyForm.markAllAsTouched();
    }
  }
  
  goBack(): void {
    this.router.navigate(['/company']);

  }

}
