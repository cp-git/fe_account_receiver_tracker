import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceGeneratorModule } from './invoice-generator/invoice-generator.module';
import { HomepageModule } from './homepage/homepage.module';
import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomepageModule,
    LoginModule,
    InvoiceGeneratorModule,
    HttpClientModule

  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
