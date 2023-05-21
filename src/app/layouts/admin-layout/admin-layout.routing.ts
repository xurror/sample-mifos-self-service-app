import { Routes } from '@angular/router';

import { HomeComponent } from "../../home/home.component";
import { UserProfileComponent } from '../../profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: HomeComponent },
  { path: "profile", component: UserProfileComponent },
];
