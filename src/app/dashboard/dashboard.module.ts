import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { OverviewComponent } from "./overview/overview.component";
import { LoanAccountComponent } from "./loan-account/loan-account.component";
import { MoneyFormatPipe } from "app/pipes/money-pipe";
import { MaterialModule } from "app/material.module";

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  providers: [DatePipe],
  declarations: [
    OverviewComponent,
    DashboardComponent,
    LoanAccountComponent,
    MoneyFormatPipe,
  ],
  exports: [OverviewComponent, DashboardComponent, LoanAccountComponent],
})
export class DashboardModule {}
