import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CompanyMembers} from '../../classes/company-members';
import { Company } from 'src/app/company/classes/company';
import { CompanyService } from 'src/app/company/services/company.service';
import { CompanyStaffService } from '../../services/company-staff.service';
import { Role } from 'src/app/role/class/role';
import { RoleService } from 'src/app/role/service/role.service';
import { LoginDetails } from 'src/app/login/class/logindetails';

@Component({
  selector: 'app-add-company-member',
  templateUrl: './add-company-member.component.html',
  styleUrls: ['./add-company-member.component.css']
})
export class AddCompanyMemberComponent implements OnInit {
  member: CompanyMembers = new CompanyMembers(
    0, 
    '', 
    '', 
    '', 
    new Company(0, '', '', '', '', false), 
    new LoginDetails('', '', new Role(0, ''), false, false), // Initialize with LoginDetails and Role
    false
  );
  companies: Company[] = [];
  roles: Role[] = [];
  role!: Role;
  addForm!: FormGroup;

  constructor(
    private companyService: CompanyService,
    private companyMembersService: CompanyStaffService,
    private roleService: RoleService, // Inject the RoleService
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCompanies();
    this.loadRoles(); // Load roles on initialization
  }

  initializeForm(): void {
    this.addForm = this.fb.group({
      memberName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      memberEmail: ['', [Validators.required, Validators.email]],
      memberContact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      companyId: ['', Validators.required],
      roleId: ['', Validators.required],
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

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  
  onSubmit(): void {
    if (this.addForm.valid) {
     
  console.log(this.addForm.value.roleId)
  
      const loginDetails = new LoginDetails(
        this.addForm.value.username,
        this.addForm.value.password,
        new Role(this.addForm.value.roleId, ''), // Directly create the Role object
        this.addForm.value.active,
        false
      );
  
      console.log('Login Details:', loginDetails); // Debugging line
  
      this.member = {
        ...this.addForm.value,
        company: { companyId: this.addForm.value.companyId },
        loginDetails: loginDetails
      };
  
      console.log(this.member);
  
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
