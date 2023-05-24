import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainLayoutRoutes } from './main-layout.routing';
import { UserProfileComponent } from '../../profile/user-profile.component';
import { DashboardModule } from 'app/dashboard/dashboard.module';
import { MaterialModule } from 'app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DashboardModule,
    RouterModule.forChild(MainLayoutRoutes),
  ],
  declarations: [
    UserProfileComponent,
  ],
})
export class AdminLayoutModule {}
