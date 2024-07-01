import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyStaffService } from '../../services/company-staff.service';
import { CompanyMembers } from '../../classes/company-members';
import { Company } from 'src/app/company/classes/company';
import { Role } from 'src/app/role/class/role';
import { CompanyService } from 'src/app/company/services/company.service';
import { RoleService } from 'src/app/role/service/role.service';

@Component({
  selector: 'app-update-company-member',
  templateUrl: './update-company-member.component.html',
  styleUrls: ['./update-company-member.component.css']
})
export class UpdateCompanyMemberComponent implements OnInit {
  updateForm!: FormGroup;
  memberId: number = 0;
  companies: Company[] = []; // Array to hold companies
  roles: Role[] = []; // Array to hold roles

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyMembersService: CompanyStaffService,
    private roleService: RoleService,
    private companyService: CompanyService // Ensure you have imported and provided CompanyService correctly
  ) {}

  ngOnInit(): void {
    this.memberId = this.route.snapshot.params['id'];
    this.updateForm = this.fb.group({
      memberName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      memberEmail: ['', [Validators.required, Validators.email]],
      memberContact: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      companyId: ['', Validators.required],
      roleId: ['', Validators.required], // Added roleId form control
      active: [true]
    });

    this.loadMemberDetails();
    this.loadCompanies();
    this.loadRoles(); // Fetch roles from your service
  }

  private loadMemberDetails(): void {
    this.companyMembersService.getCompanyMemberById(this.memberId).subscribe(member => {
      this.updateForm.patchValue({
        memberName: member.memberName,
        username: member.username,
        password: member.password,
        memberEmail: member.memberEmail,
        memberContact: member.memberContact,
        companyId: member.company.companyId,
        roleId: member.loginDetails.role.id, // Set roleId if available
        active: member.active
      });
      // Find the company in the companies array and set it as selected
      const company = this.companies.find(c => c.companyId === member.company.companyId);
      if (company) {
        this.updateForm.get('companyId')?.patchValue(company.companyId);
      }
       // Find the role in the roles array and set it as selected
       const role = this.roles.find(r => r.id === member.loginDetails.role.id);
       if (role) {
         this.updateForm.get('roleId')?.patchValue(role.id);
       }
    });
  }
  
  private loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  private loadRoles(): void {
    // Fetch roles from your service and assign them to the roles array
    this.roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  goBack(): void {
    this.router.navigate(['/companymembers']);
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const formValue = this.updateForm.value;
      
      // Find the selected role from roles array
      const selectedRole = this.roles.find(role => role.id === formValue.roleId);

      const updatedMember: CompanyMembers = {
        memberId: this.memberId,
        memberName: formValue.memberName,
        memberEmail: formValue.memberEmail,
        memberContact: formValue.memberContact,
        company: {
          companyId: formValue.companyId,
          companyName: '',
          companyAddress: '',
          companyContact: '',
          companyPerson: '',
          active: true
        },
        loginDetails: {
          id: 0, // Set appropriate value based on your logic
          role: {
            id:formValue.roleId,
            roleName:''

          }, // Use selectedRole or null if not found
          active: true, // Example value, adjust as per your requirements
          isLoggedIn: false, // Example value, adjust as per your requirements
          username: formValue.username,
          password: formValue.password,
          getMaskedPassword(): string {
            // Implement logic to return a masked password if needed
            return '********'; // Example implementation
          }
        },
        active: formValue.active
      };

      this.companyMembersService.updateCompanyMember(this.memberId, updatedMember)
        .subscribe(response => {
          console.log('Company member updated successfully');
          this.router.navigate(['/companymembers']); // Adjust the path as needed
        }, error => {
          console.error('Error updating company member', error);
        });
    }
  }
}
