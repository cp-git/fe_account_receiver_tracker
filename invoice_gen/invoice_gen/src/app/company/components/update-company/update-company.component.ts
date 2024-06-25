import { Component } from '@angular/core';
import { Company } from '../../classes/company';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent {
  company!: Company;
  companyId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    this.companyService.getCompanyById(this.companyId).subscribe(data => {
      this.company = data;
    }, error => console.log(error));
  }

  updateCompany(): void {
    this.companyService.updateCompany(this.companyId, this.company).subscribe(data => {

      console.log("Company UPdated successfully")
      this.router.navigate(['/company']);
    }, error => console.log(error));
  }


  goBack(): void {
    this.router.navigate(['/company']);

  }
}
