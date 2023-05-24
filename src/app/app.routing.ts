import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthenticationGuard } from './core/authentication/authentication.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/main-layout/main-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "auth",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  { path: "**", redirectTo: "dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  providers: [],
  exports: [],
})
export class AppRoutingModule { }
