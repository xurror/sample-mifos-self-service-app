import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { InputErrorComponent } from './input-error/input-error.component';

@NgModule({
  imports: [CommonModule, MatInputModule, RouterModule, FormsModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InputErrorComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    InputErrorComponent,
  ],
})
export class ComponentsModule {}
