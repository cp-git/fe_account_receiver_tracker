import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyStaffService } from '../../services/company-staff.service';
import { CompanyMembers } from '../../classes/company-members';
import { Company } from 'src/app/company/classes/company';
import { CompanyService } from 'src/app/company/services/company.service';

@Component({
  selector: 'app-update-company-member',
  templateUrl: './update-company-member.component.html',
  styleUrls: ['./update-company-member.component.css']
})
export class UpdateCompanyMemberComponent {
  updateForm!: FormGroup;
  memberId: number = 0;
  companies: Company[] = []; // Array to hold companies


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyMembersService: CompanyStaffService,
    private companyService: CompanyService
    
  ) { }

 
  ngOnInit(): void {
    this.memberId = this.route.snapshot.params['id'];
    this.updateForm = this.fb.group({
      memberName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      memberEmail: ['', [Validators.required, Validators.email]],
      memberContact: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      companyId: ['', Validators.required],
      active: [true]
    });

    this.loadMemberDetails();
    this.loadCompanies();
  }

  private loadMemberDetails(): void {
    this.companyMembersService.getCompanyMemberById(this.memberId).subscribe(member => {
      // this.updateForm.patchValue(member);
      this.updateForm.patchValue({
        memberName: member.memberName,
        username: member.username,
        password: member.password,
        memberEmail: member.memberEmail,
        memberContact: member.memberContact,
        companyId: member.company.companyId, // Set the selected companyId
        active: member.active
      });
      // Find the company in the companies array and set it as selected
      const company = this.companies.find(c => c.companyId === member.company.companyId);
      if (company) {
        this.updateForm.get('companyId')?.patchValue(company.companyId);
      }
    });
  }
  
  private loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }
  goBack(){
    this.router.navigate(['/companymembers']);

  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const formValue = this.updateForm.value;
      const updatedMember: CompanyMembers = {
        memberId: formValue.memberId,
        memberName: formValue.memberName,
        username: formValue.username,
        password: formValue.password,
        memberEmail: formValue.memberEmail,
        memberContact: formValue.memberContact,
        company: {
          companyId: formValue.companyId // Assuming companyId is a number
          ,
          companyName: '',
          companyAddress: '',
          companyContact: '',
          companyPerson: '',
          active: true
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
