import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { authRoutes } from "./auth.routing";
import { SignupComponent } from './signup/signup.component';
import { ComponentsModule } from "app/components/components.module";
import { MaterialModule } from "app/material.module";

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        MaterialModule,
        ComponentsModule
    ]
})
export class AuthModule {}
