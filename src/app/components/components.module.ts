import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from "@angular/material/input";
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [CommonModule, MatInputModule, RouterModule, FormsModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
  ],
})
export class ComponentsModule {}
