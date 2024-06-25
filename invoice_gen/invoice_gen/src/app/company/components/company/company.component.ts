import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../classes/company';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  companies!: Company[];
  displayedColumns: string[] = ['companyId', 'companyName', 'companyAddress', 'companyContact', 'companyPerson', 'active', 'actions'];

  constructor(private companyService: CompanyService,private router: Router,private location: Location
  ) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      data => {
        this.companies = data;
      },
      error => {
        console.error('Error loading companies:', error);
      }
    );
  }

  addCompany(){
    console.log("called")
    this.router.navigate(['/newcompany']);

  }
  editCompany(companyId: any): void {
    this.router.navigate(['/companies', companyId, 'edit']);
  }

  deleteCompany(companyId: any): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(companyId).subscribe(() => {
        this.loadCompanies(); // Reload companies after deletion
      });
    }
  }


  goBack(): void {
    this.router.navigate(['/invoice']);

  }
}
