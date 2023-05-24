import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../profile/user-profile.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';

export const MainLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "profile", component: UserProfileComponent },
];
