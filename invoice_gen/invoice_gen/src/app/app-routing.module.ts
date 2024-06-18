import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/components/homepage/homepage.component';
import { LoginComponent } from './login/components/login/login.component';
import { InvoicegenComponent } from './invoice-generator/components/invoicegen/invoicegen.component';
const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'invoice', component: InvoicegenComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
