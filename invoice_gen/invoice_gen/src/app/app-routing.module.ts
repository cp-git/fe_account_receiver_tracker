import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/components/homepage/homepage.component';
import { LoginComponent } from './login/components/login/login.component';
import { InvoicegenComponent } from './invoice-generator/components/invoicegen/invoicegen.component';
import { InvoicedatereportComponent } from './invoice-generator/components/invoicedatereport/invoicedatereport.component';
import { CompanyComponent } from './company/components/company/company.component';
import { CreatecompanyComponent } from './company/components/createcompany/createcompany.component';
import { UpdateCompanyComponent } from './company/components/update-company/update-company.component';
import { CompanyMembers } from './company-staff/classes/company-members';
import { CompanyMembersListComponent } from './company-staff/components/company-members-list/company-members-list.component';
import { AddCompanyMemberComponent } from './company-staff/components/add-company-member/add-company-member.component';
import { UpdateCompanyMemberComponent } from './company-staff/components/update-company-member/update-company-member.component';
const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'invoice', component: InvoicegenComponent },
  { path: 'report', component: InvoicedatereportComponent },
  { path: 'report', component: InvoicedatereportComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'newcompany', component: CreatecompanyComponent},
  { path: 'companies/:id/edit', component: UpdateCompanyComponent },
  { path: 'companymembers', component: CompanyMembersListComponent },
  { path: 'addcompanymembers', component: AddCompanyMemberComponent },
  { path: 'companymembers/:id/edit', component: UpdateCompanyMemberComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
