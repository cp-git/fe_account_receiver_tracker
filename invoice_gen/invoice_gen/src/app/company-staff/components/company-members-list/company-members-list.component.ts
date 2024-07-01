import { Component } from '@angular/core';
import { CompanyMembers } from '../../classes/company-members';
import { CompanyStaffService } from '../../services/company-staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-members-list',
  templateUrl: './company-members-list.component.html',
  styleUrls: ['./company-members-list.component.css']
})
export class CompanyMembersListComponent {

  companyMembers: CompanyMembers[] = [];

  constructor(private companyMembersService: CompanyStaffService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCompanyMembers();
  }
  getAllCompanyMembers(): void {
    this.companyMembersService.getAllCompanyMembers()
      .subscribe(
        (data: CompanyMembers[]) => {
          console.log(data)
          // Sort companyMembers array by memberId in ascending order
          this.companyMembers = data.sort((a, b) => a.memberId - b.memberId);
        },
        (error: any) => {
          console.log('Error fetching company members:', error);
        }
      );
  }
  
  deleteCompanyMember(memberId: number): void {
    if (confirm('Are you sure you want to delete this member?')) {
      this.companyMembersService.deleteCompanyMember(memberId)
        .subscribe(
          () => {

            // Remove the deleted member from the array
            this.companyMembers = this.companyMembers.filter(member => member.memberId !== memberId);
           
            console.log('Company member deleted successfully.');

          },
          (          error: any) => {
            console.log('Error deleting company member:', error);
          }
        );
    }
  }
  goBack(){
    this.router.navigate(['/invoice']);

  }
  editCompanyMember(memberId: number){
    this.router.navigate(['/companymembers', memberId, 'edit']);

  }

  addCompanyMember(): void {
    this.router.navigate(['/addcompanymembers']);
  }
 
}
