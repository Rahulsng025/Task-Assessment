import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialItemsComponent } from './Component/financial-items/financial-items.component';

const routes: Routes = [
  { path: '', redirectTo: '/FinancialItemsComponent', pathMatch: 'full', },
  { path: 'FinancialItemsComponent', component: FinancialItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
