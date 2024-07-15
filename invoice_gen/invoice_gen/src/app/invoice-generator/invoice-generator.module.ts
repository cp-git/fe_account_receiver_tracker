import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicegenComponent } from './components/invoicegen/invoicegen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoicedatereportComponent } from './components/invoicedatereport/invoicedatereport.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UpdateinvoiceComponent } from './components/updateinvoice/updateinvoice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminupdateinvoiceComponent } from './components/adminupdateinvoice/adminupdateinvoice.component';
@NgModule({
  declarations: [
    InvoicegenComponent,
    InvoicedatereportComponent,
    UpdateinvoiceComponent,
    AdminupdateinvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatDatepickerModule,
    BrowserModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule



  ]
})
export class InvoiceGeneratorModule { }
