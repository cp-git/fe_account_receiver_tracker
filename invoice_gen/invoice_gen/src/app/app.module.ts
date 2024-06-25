import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceGeneratorModule } from './invoice-generator/invoice-generator.module';
import { HomepageModule } from './homepage/homepage.module';
import { LoginModule } from './login/login.module';
import { CompanyComponent } from './company/components/company/company.component';
import { CreatecompanyComponent } from './company/components/createcompany/createcompany.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCompanyComponent } from './company/components/update-company/update-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { CompanyMembersListComponent } from './company-staff/components/company-members-list/company-members-list.component';
import { AddCompanyMemberComponent } from './company-staff/components/add-company-member/add-company-member.component';
import { UpdateCompanyMemberComponent } from './company-staff/components/update-company-member/update-company-member.component';

import { DialogModule } from './dialog/dialog.module';




@NgModule({
  declarations: [AppComponent, CompanyComponent, CreatecompanyComponent, UpdateCompanyComponent,  CompanyMembersListComponent, AddCompanyMemberComponent, UpdateCompanyMemberComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomepageModule,
    LoginModule,
    DialogModule,
    InvoiceGeneratorModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule, // Add MatCardModule here
    MatButtonModule, // Add MatButtonModule here
    MatIconModule, // Add MatIconModule here
    MatTableModule,// Add MatTableModule here
    ReactiveFormsModule,
    RouterModule.forRoot([]),

    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
