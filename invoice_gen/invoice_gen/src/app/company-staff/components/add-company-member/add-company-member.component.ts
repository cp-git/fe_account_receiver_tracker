import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CompanyMembers } from '../../classes/company-members';
import { Company } from 'src/app/company/classes/company';
import { CompanyService } from 'src/app/company/services/company.service';
import { CompanyStaffService } from '../../services/company-staff.service';

@Component({
  selector: 'app-add-company-member',
  templateUrl: './add-company-member.component.html',
  styleUrls: ['./add-company-member.component.css']
})
export class AddCompanyMemberComponent implements OnInit {
  member: CompanyMembers = new CompanyMembers(0, '', '', '', '', '', new Company(0, '', '', '', '', false), false);
  companies: Company[] = [];
  addForm!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private companyMembersService: CompanyStaffService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();

    this.loadCompanies();
  }

  initializeForm(): void {
    this.addForm = this.fb.group({
      memberName: ['', Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      memberEmail: ['', [Validators.required, Validators.email]],
      memberContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      companyId: ['', Validators.required],
      active: [false]
    });
  }
  loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.member = {
        ...this.addForm.value,
        company: { companyId: this.addForm.value.companyId }
      };

      this.companyMembersService.saveCompanyMember(this.member).subscribe(
        () => {
          console.log('Company member added successfully');
          this.router.navigate(['/companymembers']);
        },
        (error: any) => {
          console.error('Error occurred while adding company member:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/companymembers']);
  }
}
