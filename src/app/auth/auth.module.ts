import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { authRoutes } from "./auth.routing";
import { SignupComponent } from './signup/signup.component';
import { ComponentsModule } from "app/components/components.module";

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(authRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        RouterModule,
        HttpClientModule,
        ComponentsModule
    ]
})
export class AuthModule {}
