import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { FinancialItemsComponent } from './Component/financial-items/financial-items.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterService, 
  PageService, 
  SortService, 
  EditService, 
  ToolbarService,
  CommandColumnService,
  PdfExportService,
  ExcelExportService,
  GridModule } from '@syncfusion/ej2-angular-grids';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent,
    FinancialItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    ChartModule,
    DropDownListModule,
    CheckBoxModule,
    FormsModule
  ],
  providers: [FilterService, 
    PageService, 
    SortService, 
    EditService, 
    ToolbarService, 
    CommandColumnService,
    PdfExportService,
    ExcelExportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
