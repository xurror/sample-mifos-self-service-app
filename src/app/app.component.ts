import { Component} from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationService } from './core/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private router: Router,
    private bnIdle: BnNgIdleService,
    private authService: AuthenticationService
  ) {
    this.bnIdle.startWatching(900).subscribe((isTimedOut) => {
      console.log("Idle Timeout Status:", isTimedOut);
      if (isTimedOut) {
        if (this.authService.isAuthenticated()) {
          this.authService.logout();
          this.router.navigate(["/auth"], { replaceUrl: true });
        }
      }
    });
  }
}
